const bcrypt = require('bcrypt')
const { client } = require('../database/connection');
const { deleteFile, saveFile } = require('../database/diskStorage');
const AppError = require('../errors/appError');
const User = require('../models/user');

module.exports = {
  async getAllUsers() {
    const { rows } = await client.query('SELECT id, name, email FROM users');
    const users = rows

    return users
  },

  async getUserById(id) {
    const { rows } = await client.query('SELECT id, name, email FROM users WHERE id = $1', [ id ])
    const user = rows[0]

    if (!user) {
      throw new AppError('User does not exist!')
    }

    return user
  },

  async create(user) {
    const { rows } = await client.query('SELECT email FROM users WHERE email = $1', [ user.email ])
    const userExists = rows[0];

    if (!userExists) {
      const encryptedPassword = await bcrypt.hash(user.password, 8);

      const userCreated = new User(user.name, user.email, encryptedPassword)
        
      await client.query(`
      INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)`,
      [userCreated.id, userCreated.name, userCreated.email, encryptedPassword])

      return userCreated
    } else {
     throw new AppError('User already exists!')
    }
  },

  async deleteUser(id) {
    const { rows } = await client.query('SELECT id FROM users WHERE id = $1', [ id ])
    const usersExists = rows[0];

    if (!usersExists) {
      throw new AppError('User does not exists!')
    }

    await client.query('DELETE FROM users WHERE id = $1', [id])
  },

  async updateUser(id, { ...rest }) {
    const { rows } = await client.query('SELECT * FROM users where id = $1', [ id ])
    const userExists = rows[0];

    if (!userExists) {
      throw new AppError('User does not exists!')
    }
      
    const updatedUser = Object.assign(userExists, rest)
    await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [updatedUser.name, updatedUser.email, id])

    return updatedUser
  },

  async updateUserAvatar(id, avaterFilename) {
    const { rows } = await client.query('SELECT id, avatar, avatar_url FROM users WHERE id = $1', [id])
    const userExists = rows[0]

    if (!userExists) {
      throw new AppError('User does not exists!')
    }

    if (userExists.avatar) {
      await deleteFile(userExists.avatar)
    }

    const avatarFile = await saveFile(avaterFilename)

    userExists.avatar = avatarFile
    userExists.avatar_url = `${process.env.APP_API_URL}/files/${avatarFile}`

    await client.query('UPDATE users SET avatar = $1, avatar_url = $2 WHERE id = $3', [userExists.avatar, userExists.avatar_url, id])

    return userExists
  },

  async resetPasswordUser(id, newPassword) {
    const { rows } = await client.query('SELECT password FROM users where id = $1', [ id ])
    const userExists = rows[0];

    if (!userExists) {
      throw new AppError('User does not exists!')
    }

    const updatedPassword = await bcrypt.hash(newPassword, 8)
    await client.query('UPDATE users SET password = $1', [updatedPassword])
  }
}