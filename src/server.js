const express =  require('express')
const cors = require('cors')
require('express-async-errors')
const server = express();

require('dotenv/config')

const createTables = require('./database/tables');
const AppError = require('./errors/appError');
createTables()

server.use(cors())
server.use(express.json())
server.use('/api/users', require('./routes'))
server.use('/files', express.static('tmp/uploads'))
server.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    stack: err.stack
  })
})


server.listen(3000, (req, res) => {
  console.log('Server started on localhost:3000')
})