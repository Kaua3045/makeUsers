const express =  require('express')
const server = express();

server.get('/', (req, res) => {
  res.send({
    message: 'Hello World!'
  })
})

server.listen(3000, (req, res) => {
  console.log('Server started on localhost:3000')
})