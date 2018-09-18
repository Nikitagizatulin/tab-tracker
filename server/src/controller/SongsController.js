const { Song } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      let song = null
      const search = req.query.search
      if (search) {
        song = await Song.findAll({
          where: {
            $or: ['title',
              'artist',
              'genre',
              'album'
            ].map(item => ({
              // let a = Object.create(null)
              // a['title'] = { $like: `%${search}%` }
              [item]: { $like: `%${search}%` }
            })
            )
          }
        })
      } else {
        song = await Song.findAll({
          limit: 10
        })
      }
      res.send(song)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the songs.'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (e) {
      console.log('here the error', e)
      res.status(500).send({
        error: 'An error has occured trying to create the song.'
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findById(req.params.songId)
      res.send(song)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the song.'
      })
    }
  },
  async put (req, res) {
    try {
      await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(this.body)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to update the song.'
      })
    }
  }
}
