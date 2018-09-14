const { Song } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const song = await Song.findAll({
        limit: 10
      })
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
  }
}
