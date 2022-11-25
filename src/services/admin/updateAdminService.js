const AdminRepository = require('../../repositories/admins/adminRepository')
const { getUserById } = require('../users')

const UserNotExistsError = require('../../errors/usersErrors/userNotExists')
const NotUpdateYouAdminError = require('../../errors/adminErrors/notUpdateYouAdmin')

module.exports = {
  async updateAdmin(adminLogged, email, admin) {
    const adminRepository = new AdminRepository()

    const adminExists = await adminRepository.findAdminByEmail(email)

    if (!adminExists) {
      throw new UserNotExistsError()
    }

    const userLogged = await getUserById(adminLogged)

    if (userLogged.email === email) {
      throw new NotUpdateYouAdminError()
    }

    await adminRepository.updateAdmin(email, admin)
  }
}