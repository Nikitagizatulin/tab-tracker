const { History, Song } = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try {
      const UserId = req.user.id
      const histories = await History.findAll({
        where: { UserId },
        include: [
          {
            model: Song
          }
        ],
        order: [
          ['id', 'DESC']
        ]
      })
        .map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        ))
      res.send(histories)
    } catch (e) {
      res.status(500).send({
        error: 'An error  has occured trying to fetch the history.'
      })
    }
  },
  async post (req, res) {
    try {
      const UserId = req.user.id
      const { songId } = req.body
      const history = await History.create({
        SongId: songId,
        UserId
      })
      res.send(history)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to create the history object.'
      })
    }
  }
}
