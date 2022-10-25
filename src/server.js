const express =  require('express')
const cors = require('cors')
const server = express();

require('dotenv/config')

const createTables = require('./database/tables')
createTables()

server.use(cors())
server.use(express.json())
server.use('/api/users', require('./routes'))

server.listen(3000, (req, res) => {
  console.log('Server started on localhost:3000')
})