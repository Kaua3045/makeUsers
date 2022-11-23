const { nameValid, emailValid, passwordValid } = require("./userValidators")

module.exports = {
  validateAllUserData(name, email, password) {
    nameValid(name)
    emailValid(email)
    passwordValid(password)
  }
}