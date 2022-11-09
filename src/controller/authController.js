const { auth } = require("../services/authService")

module.exports = {
  async loginController(req, res) {
    const { email, password } = req.body
    const user = await auth(email, password)

    return res.status(200).json(user)
  }
}