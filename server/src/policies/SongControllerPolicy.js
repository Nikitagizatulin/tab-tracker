const Joi = require('joi')

module.exports = {
  createOrEdit (req, res, next) {
    let userId = req.user.id
    const shema = {
      id: Joi.number().integer().allow(''),
      UserId: Joi.number().optional().valid(userId).options({
        language: {
          any: {
            allowOnly: '!! You don\'t have to access do this!'
          }
        }
      }),
      title: Joi.string().required().min(3).max(255),
      artist: Joi.string().required().min(3).max(255),
      genre: Joi.string().required().min(3).max(255),
      album: Joi.string().min(3).max(255).allow(''),
      albumImage: Joi.string().min(3).max(255).allow(''),
      youTubeId: Joi.string().min(3).max(255).allow(''),
      lyrics: Joi.string().min(3).max(5000).allow(''),
      tab: Joi.string().min(3).max(5000).allow(''),
      createdAt: Joi.date().allow(''),
      updatedAt: Joi.date().allow('')
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
}
