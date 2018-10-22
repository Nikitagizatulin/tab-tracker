const Joi = require('joi')

module.exports = (req, res, next) => {
  const shema = {
    room_name: Joi.string().required().min(3).max(125)
  }
  Joi.validate(req.body, shema)
    .then(() => {
      // check if room name exist
      next()
    })
    .catch(err => {
      res.status(400).send({
        error: (err.details[0].message).slice(0, 1) + (err.details[0].message).charAt(1).toUpperCase() + (err.details[0].message).slice(2)
      })
    })
}
