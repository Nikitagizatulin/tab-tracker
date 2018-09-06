const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const shema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Zа-яА-ЯёЁ0-9]{8,32}$')
      )
    }

    const { error, value } = Joi.validate(req.body, schema)

    if (error){
      switch (error.details[0].context.key) {
        case 'email'
          ///28^39 youtoube
      }
    } else{
      next()
    }
  }
}
