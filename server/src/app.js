//  entry point
const epxress = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// initialize application
const app = epxress()
// initialize morgan in express
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req, res) =>
  res.send({
    message: 'Hello Neo'
  })
)

app.listen(process.env.PORT || 8081)
