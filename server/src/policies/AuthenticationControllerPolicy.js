const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const shema = {
      email: Joi.string().required().email(),
      password: Joi.string().required().regex(
        new RegExp('^[a-zA-Zа-яА-ЯёЁ0-9]{8,32}$')
      ),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')).options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match'
          }
        }
      })
    }
    Joi.validate(req.body, shema)
      .then(() => {
        next()
      })
      .catch(err => {
        switch (err.details[0].context.key) {
          case 'email':
            res.status(400).send({
              error: 'You must provide a valid email address'
            })
            break
          case 'password':
            res.status(400).send({
              error: `The password match was failed`
            })
            break
          case 'confirmPassword':
            res.status(400).send({
              error: `The password confirm failed to match the following rules: <br>1.It must matched to password`
            })
            break
          default:
            res.status(400).send({
              error: 'invalid registration information'
            })
        }
      })
  },
  login (req, res, next) {
    const shema = {
      email: Joi.string().required().email(),
      password: Joi.string().required().regex(
        new RegExp('^[a-zA-Zа-яА-ЯёЁ0-9]{8,32}$')
      )
    }
    Joi.validate(req.body, shema)
      .then(() => {
        next()
      })
      .catch(err => {
        switch (err.details[0].context.key) {
          case 'email':
            res.status(400).send({
              error: 'You must provide a valid email address'
            })
            break
          case 'password':
            res.status(400).send({
              error: `The password match was failed`
            })
            break
          default:
            res.status(400).send({
              error: 'invalid login information'
            })
        }
      })
  }
}
