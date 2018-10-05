const { Chat } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const chats = await Chat.findAll()
      res.send(chats)
    } catch (e) {
      res.status(500).send({
        error: 'An error  has occured trying to fetch the chats.'
      })
    }
  },
  async show (req, res) {
    try {
      const chat = await Chat.findAll({
        where: {
          RoomId: req.params.chatId
        }
      })
      res.send(chat)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the chat.'
      })
    }
  },
  async post (req, res) {
    try {
      const chat = await Chat.create(req.body)
      res.send(chat)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to create the chat.'
      })
    }
  },
  async put (req, res) {
    try {
      let chat = await Chat.update(req.body, {
        where: {
          id: req.params.chatId
        }
      })
      res.send(chat)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to update the chat.'
      })
    }
  },
  async delete (req, res) {
    try {
      const { chatId } = req.params
      const chat = await Chat.findOne({
        where: { id: chatId }
      })
      await chat.destroy()
      res.send(chat)
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to delete the chat.'
      })
    }
  }
}
