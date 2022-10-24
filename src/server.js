const express =  require('express')
const cors = require('cors')
const server = express();

server.use(cors())
server.use(express.json())
server.use('/api/users', require('./routes'))

const { db } = require('./database/connection');

db.connect();

db.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT)')

server.listen(3000, (req, res) => {
  console.log('Server started on localhost:3000')
})