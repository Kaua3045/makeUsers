const pgp = require('pg-promise')()

const connection = 'postgres://kaua:kaua@localhost:5432/kaua'
const db = pgp(connection)

module.exports = {
  pgp, db
}