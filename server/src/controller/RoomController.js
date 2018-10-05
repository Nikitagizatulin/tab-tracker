const { Room } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const rooms = await Room.findAll()
      res.send(rooms)
    } catch (e) {
      res.status(500).send({
        error: 'An error  has occured trying to fetch the rooms.'
      })
    }
  },
  async show (req, res) {
    try {
      const room = await Room.findById(req.params.roomId)
      res.send(room)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the room.'
      })
    }
  },
  async post (req, res) {
    try {
      const room = await Room.create(req.body)
      res.send(room)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to create the room.'
      })
    }
  },
  async put (req, res) {
    try {
      let room = await Room.update(req.body, {
        where: {
          id: req.params.roomId
        }
      })
      res.send(room)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to update the room.'
      })
    }
  },
  async delete (req, res) {
    try {
      const { roomId } = req.params
      const room = await Room.findOne({
        where: { id: roomId }
      })
      await room.destroy()
      res.send(room)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to delete the room.'
      })
    }
  }
}
