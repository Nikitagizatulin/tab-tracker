const Joi = require('joi')
module.exports = (req, res, next) => {
  const shema = {
    birthdate: Joi.date().min('1-1-1951').max('now').allow(''),
    email: Joi.string().email().max(255).allow(),
    nickname: Joi.string().min(3).max(255).allow(''),
    firstName: Joi.string().min(3).max(255).allow(''),
    image: Joi.string().min(3).max(255).allow(''),
    lastName: Joi.string().min(3).max(255).allow(''),
    password: Joi.string().regex(
      new RegExp('^[a-zA-Zа-яА-ЯёЁ0-9]{8,50}$')
    ).options({
      language: {
        string: {
          regex: {
            base: 'must be min 8 characters and max 50'
          }
        }
      }
    }).allow(''),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).options({
      language: {
        any: {
          allowOnly: '!! Passwords do not match'
        }
      }
    }).when('password', {
      is: Joi.exist(),
      then: Joi.required()
    })
  }
  Joi.validate(req.body, shema)
    .then(() => {
      next()
    })
    .catch(err => {
      res.status(400).send({
        error: (err.details[0].message).slice(0, 1) + (err.details[0].message).charAt(1).toUpperCase() + (err.details[0].message).slice(2)
      })
    })
}
