//  entry point
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize, Room, Chat } = require('./models')
// initialize application
const app = express()

// initialize morgan in express
// statick files for user avatar
app.use('/static', express.static(`${__dirname}/storage`))

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 'extended': 'false' }))
app.use(cors())

require('./passport')

require('./routes')(app)

sequelize.sync({})
  .then(() => {
    try {
      let server = app.listen(process.env.PORT || '3001')

      // connect socket to crated server
      let io = require('socket.io')(server)

      // connection event listener
      io.on('connection', socket => {
        // socket.handshake contain user information which need to pass all of user in chat and room id
        Room.findById(socket.handshake.query.room)
          .then(room => {
            socket.join(room.room_name)
            let user = JSON.parse(socket.handshake.query.user)
            // if user nickname exist, use them, else we use first name + last name or email
            let userName = user.nickname ? user.nickname : (user.firstName && user.lastName) ? `${user.lastName} ${user.firstName}` : user.email
            socket.broadcast.in(room.room_name).emit('new-message', {
              message: `User ${userName} connected`,
              User: socket.handshake.query.user,
              system: true
            })
            socket.on('disconnect', () => {
              socket.broadcast.in(room.room_name).emit('new-message', {
                message: `User ${userName} disconnected`,
                User: socket.handshake.query.user,
                system: true
              })
            })
            socket.on('typing', user => {
              socket.broadcast.in(room.room_name).emit('typing', {
                name: user,
                message: `${user} is typing...`
              })
            })
            socket.on('save-message', result => {
              let data = {
                message: result.message,
                createdAt: result.createdAt,
                RoomId: result.RoomId,
                UserId: (JSON.parse(result.User)).id
              }
              Chat.create(data)
                .then(message => {
                  io.in(room.room_name).emit('new-message', result)
                })
                .catch(err => {
                  console.log(err)
                })
            })
          })
      })
      console.log(`Server started on http://localhost:${process.env.PORT || '3001'}`)
    } catch (e) {
      console.log(e)
    }
  })
