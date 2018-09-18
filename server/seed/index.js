const {
  sequelize,
  Song,
  User
} = require('../src/models')

const Promise = require('bluebird')
const songs = require('./songs')
const users = require('./users')

sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      songs.map(song => {
        Song.create(song)
      })
    )
  })
