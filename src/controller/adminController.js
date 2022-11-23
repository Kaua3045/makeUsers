const { getAllAdmins } = require("../services/admin/getAllAdminsService")
const { updateAdmin } = require("../services/admin/updateAdminService")

module.exports = {
  async updateAdminController(req, res) {
    const { email, admin } = req.body
    await updateAdmin(req.user.id, email, admin)

    return res.status(200).end()
  },

  async getAllAdminsController(req, res) {
    const admins = await getAllAdmins()

    return res.json(admins)
  }
}