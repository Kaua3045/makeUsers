const { Pool } = require('pg')

const client = new Pool({
  host: process.env.HOST_PG,
  port: process.env.PORT_PG,
  user: process.env.USER_PG,
  password: process.env.PASSWORD_PG,
  database: process.env.DATABASE_PG
})

const createConnection = async () => {
  await client.connect()
}

module.exports = { createConnection, client }