const { createConnection } = require('./connection')

const createTables = async () => {
  const { client } =  await createConnection()

  await client.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT)')
}

module.exports = createTables