const { emailValid } = require('../../validators/userValidators')
const UserRepository = require('../../repositories/users/userRepository')

const UserNotExistsError = require('../../errors/usersErrors/userNotExists')
const UserEmailExistsError = require('../../errors/usersErrors/userEmailExists')

module.exports = {
  async updateUser(id, { ...rest }) {
    const userRepository = new UserRepository()

    const userExists = await userRepository.findById(id)

    if (!userExists) {
      throw new UserNotExistsError()
    }

    if (rest.email) {
      emailValid(rest.email)

      const userByEmail = await userRepository.findByEmail(rest.email)

      if (userByEmail) throw new UserEmailExistsError()
    }

    if (!rest.name || rest.name.length === 0) {
      rest.name = userExists.name
    }

    const updatedUser = Object.assign(userExists, rest)
    await userRepository.update('name = $1, email = $2', 'id = $3', [
      updatedUser.name, updatedUser.email, id
    ])

    return updatedUser
  }
}