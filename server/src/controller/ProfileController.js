const { User } = require('../models')
const fs = require('fs')
const jwt = require('jsonwebtoken')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async show (req, res) {
    try {
      const { id } = req.body
      const user = await User.findById(id)
      if (!user) {
        res.status(400).send({
          error: 'The login information was incorrect'
        })
      }
      res.send({ user: user.toJSON() })
    } catch (e) {
      res.status(500).send({
        error: 'An error has occured trying to get User'
      })
    }
  },
  async post (req, res) {
    let filename = ''
    if (req.file) {
      filename = `${Date.now()}-${req.file.originalname}`
      await fs.writeFile(`./src/storage/${filename}`, req.file.buffer, 'ascii', err => {
        if (err) {
          return res.status(500).send({
            error: 'Something went wrong with  uploading image'
          })
        }
      })
    }

    if (Object.keys(req.body).length === 0 && filename === '') {
      return res.status(400).send({
        error: 'nothing to update'
      })
    } else {
      try {
        let newVal = {}
        if (filename !== '') newVal.image = filename
        for (let key in req.body) {
          if (req.body[key] && key !== 'passwordConfirm') newVal[key] = req.body[key]
        }
        const user = await User.findById(req.user.id)
        let result = await user.update(newVal)
        res.send({
          countUpdate: JSON.stringify(Object.keys(newVal).length),
          user: result.toJSON(),
          token: jwtSignUser(result.toJSON())
        })
      } catch (e) {
        if (e.errors[0].path === 'email') {
          res.status(500).send({
            error: e.errors[0].message
          })
        } else {
          res.status(500).send({
            error: 'An error has occured trying to update user profile'
          })
        }
      }
    }
  }
}
