const server = require('./config/app')

server.listen(3000, (req, res) => {
  console.log('Server started on localhost:3000')
})