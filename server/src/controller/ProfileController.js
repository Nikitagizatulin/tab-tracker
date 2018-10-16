const { User } = require('../models')
let formidable = require('formidable')

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
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      console.log(err)
      console.log(fields)
      console.log(files)
    })
    res.json({ message: 'success' })
    // try {
    //   const { id } = req.body
    //   const user = await User.findById(id)
    //   if (!user) {
    //     res.status(400).send({
    //       error: 'The login information was incorrect'
    //     })
    //   }
    //   res.send({ user: user.toJSON() })
    // } catch (e) {
    //   res.status(500).send({
    //     error: 'An error has occured trying to get User'
    //   })
    // }
  }
}
