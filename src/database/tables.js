const { createConnection, client } = require('./connection')

const createTables = async () => {
  await createConnection()

  await client.query(`
    CREATE TABLE IF NOT EXISTS users 
    (id UUID PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT,
    admin BOOLEAN NOT NULL DEFAULT false, avatar TEXT)
  `)

  await client.query(`
    CREATE TABLE IF NOT EXISTS products 
    (id UUID PRIMARY KEY, name TEXT UNIQUE, description TEXT, price NUMERIC, amount INTEGER)
  `)

  await client.query(`
    CREATE TABLE IF NOT EXISTS products_images 
    (id UUID PRIMARY KEY, name TEXT UNIQUE, product_id UUID, 
    CONSTRAINT fk_ProduImage FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE cascade)
  `)
}

module.exports = createTables