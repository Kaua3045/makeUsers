require('dotenv/config')
require('express-async-errors')

const express =  require('express')
const cors = require('cors')
const createTables = require('./database/tables')
const { errorsMiddleware } = require('./middlewares/errorsMiddleware')
const router = require('./routes')

const server = express()
createTables()

server.use(cors())
server.use(express.json())
server.use('/api', router)
server.use('/files', express.static('tmp/uploads'))
server.use(errorsMiddleware)

server.listen(3000, (req, res) => {
  console.log('Server started on localhost:3000')
})