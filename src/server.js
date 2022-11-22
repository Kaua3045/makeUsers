const express =  require('express')
const cors = require('cors')
require('express-async-errors')
const server = express();

require('dotenv/config')

const createTables = require('./database/tables');
const { errorsMiddleware } = require('./middlewares/errorsMiddleware');
createTables()

server.use(cors())
server.use(express.json())
server.use('/api', require('./routes'))
server.use('/files', express.static('tmp/uploads'))
server.use(errorsMiddleware)

server.listen(3000, (req, res) => {
  console.log('Server started on localhost:3000')
})