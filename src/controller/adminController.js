const { updateAdmin } = require("../services/adminService")

module.exports = {
  async adminController(req, res) {
    const { email, admin } = req.body
    const updateAdminService = await updateAdmin(email, admin)

    if (updateAdminService instanceof Error) {
      return res.status(400).json(updateAdminService.message)
    }

    return res.status(200).end()
  }
}