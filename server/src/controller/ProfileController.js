const { User } = require('../models')

module.exports = {
  async show (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        res.status(400).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(400).send({
          error: 'The login information was incorrect'
        })
      }

      res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON())
      })
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to lig in'
      })
    }
  },
  async post (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        res.status(400).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(400).send({
          error: 'The login information was incorrect'
        })
      }

      res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON())
      })
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to lig in'
      })
    }
  }
}
