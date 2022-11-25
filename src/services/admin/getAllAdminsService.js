const { client } = require('../../database/connection')
const User = require('../../models/user')
const AdminRepository = require('../../repositories/admins/adminRepository')

module.exports = {
  async getAllAdmins() {
    const adminRepository = new AdminRepository()
    const admins = await adminRepository.findAllAdmins()

    return admins
  }
}