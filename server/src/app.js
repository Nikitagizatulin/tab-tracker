//  entry point
require('dotenv').config()
const epxress = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize, Room, Chat } = require('./models')
// initialize application
const app = epxress()

// initialize morgan in express
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
        Room.findById(socket.handshake.query.room)
          .then(room => {
            socket.join(room.room_name)

            io.in(room.room_name).emit('new-message', {
              message: {
                message: `User ${socket.handshake.query.nickname} connected`,
                nickname: 'System'
              }
            })
            socket.on('disconnect', () => {
              io.in(room.room_name).emit('new-message', {
                message: {
                  message: `User ${socket.handshake.query.nickname} disconnected`,
                  nickname: 'System'
                }
              })
            })
            socket.on('save-message', data => {
              Chat.create({
                nickname: data.nickname,
                message: data.message,
                createdAt: data.created_date,
                RoomId: data.room
              })
                .then(message => {
                  console.log(message)
                  io.in(room.room_name).emit('new-message', { message: data })
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
