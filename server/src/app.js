//  entry point
const epxress = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')
// initialize application
const app = epxress()
// initialize morgan in express
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync({})
  .then(() => {
    app.listen(config.port || '3001')
    console.log(`Server started on http://localhost:${config.port}`)
  })
