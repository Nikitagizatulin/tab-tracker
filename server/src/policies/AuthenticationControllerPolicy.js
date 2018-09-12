const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const shema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Zа-яА-ЯёЁ0-9]{8,32}$')
      )
    }
    console.log(Joi.validate(req.body, shema))
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
              error: `The password failed to match the following rules: <br>1.It must containe ONLY the fallowing characters: lower case, uppers case, numeric<br>2.It must be a least 8 characters in length and not greater than 32 characters in length`
            })
            break
          default:
            res.status(400).send({
              error: 'invalid registration information'
            })
        }
      })
  }
}
