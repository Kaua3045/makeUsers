const { createConnection, client } = require('./connection')

const createTables = async () => {
  await createConnection()

  await client.query('CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT)')
}

module.exports = createTables