const { Bookmark, Song } = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.query
      let where = {
        UserId: userId
      }
      if (songId) {
        where.SongId = songId
      }
      const bookmark = await Bookmark.findAll({
        where,
        include: [
          {
            model: Song
          }
        ]
      })
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend(
          {},
          bookmark.Song,
          bookmark
        ))
      res.send(bookmark)
    } catch (e) {
      res.status(500).send({
        error: 'An error  has occured trying to fetch the bookmark.'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const { songId } = req.body
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        })
      }
      const bookmarkNew = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(bookmarkNew)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to create the bookmark.'
      })
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id
      const { bookmarkId } = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'You do not access to delete this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to delete the bookmark.'
      })
    }
  }
}
