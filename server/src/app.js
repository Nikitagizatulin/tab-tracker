//  entry point
require('dotenv').config()
const epxress = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
// initialize application
const app = epxress()

// initialize morgan in express
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 'extended': 'false' }))
app.use(cors())

require('./passport')

require('./routes')(app)

sequelize.sync({})
  .then(() => {
    app.listen(process.env.PORT || '3001')
    console.log(`Server started on http://localhost:${process.env.PORT || '3001'}`)
  })
