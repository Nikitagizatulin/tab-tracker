const multer = require('multer')
let path = require('path')

module.exports = (req, res, next) => {
  multer({
    fileFilter (req, file, cb) {
      let filetypes = /jpeg|jpg|gif|bmp|png|svg/
      let mimetype = filetypes.test(file.mimetype)
      let extname = filetypes.test(path.extname(file.originalname).toLowerCase())
      if (file.size > 2000000) {
        return res.status(422).send({
          error: 'Max file size is  2 mb'
        })
      }
      if (mimetype && extname) {
        return cb(null, true)
      }
      return res.status(422).send({
        error: 'Error: File upload only supports the following file types - ' + filetypes
      })
    }
  })
    .single('imageFile')(req, res, next)
}
