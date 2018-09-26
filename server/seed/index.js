require('dotenv').config()
const {
  sequelize,
  Song,
  User,
  Bookmark,
  History
} = require('../src/models')
const Promise = require('bluebird')
const songs = require('./songs')
const users = require('./users')
const bookmarks = require('./bookmarks')
const histories = require('./histories')

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

    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )

    await Promise.all(
      histories.map(hostiry => {
        History.create(hostiry)
      })
    )
  })
