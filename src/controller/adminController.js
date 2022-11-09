const { updateAdmin } = require("../services/adminService")

module.exports = {
  async adminController(req, res) {
    const { email, admin } = req.body
    await updateAdmin(email, admin)

    return res.status(200).end()
  }
}