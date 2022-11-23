const validator = require('validator')
const UserEmailInvalidError = require('../errors/usersErrors/userEmailInvalid')
const UserNameInvalidError = require('../errors/usersErrors/userNameInvalid')
const UserPasswordEmptyError = require('../errors/usersErrors/userPasswordEmpty')
const UserPasswordInvalidError = require('../errors/usersErrors/userPasswordInvalid')

module.exports = {
  emailValid(email) {
    const isValid = validator.isEmail(email)
    if (!isValid) throw new UserEmailInvalidError()
  },

  nameValid(name) {
    const empty = validator.isEmpty(name)
    if (empty === true) throw new UserNameInvalidError()
  },

  passwordValid(password) {
    const empty = validator.isEmpty(password)
    if (empty === true) throw new UserPasswordEmptyError()

    const valid = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    })

    if (valid === false) throw new UserPasswordInvalidError()
  }
}