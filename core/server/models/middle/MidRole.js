import { Role } from '../'

class MidRole {
    async createRole(data) {
        try {
            let role = await Role.create(data)
            if (!role) {
                throw new Error('không tồn tại nhóm quyền')
            } return role
        } catch (err) {
            throw new Error(err)
        }
    }

    async getRole() {
        try {
            let role = await Role.findAll({
                where: {
                    del: 0
                }
            })
            if (!role) {
                throw new Error('không tồn tại nhóm quyền')
            } return role
        } catch (err) {
            throw new Error(err)
        }
    }

    getRoleById = async (id) => {
        try {
            let role = await Role.findOne({
                where: {
                    del: 0,
                    id
                }
            })
            if (!role) {
                throw new Error('không tồn tại nhóm quyền')
            }
            return role
        } catch (err) {
            throw new Error(err)
        }
    }

    updateRole = async (data) => {
        try {
            let role = await Role.findOne({
                where: {
                    del: 0,
                    id: data.id
                }
            })
            if (!role) {
                throw new Error('không tồn tại nhóm quyền')
            } return role.update(data)
        } catch (err) {
            throw new Error(err)
        }

    }

    deleteRole = async (id) => {
        try {
            let role = await Role.findOne({
                where: {
                    del: 0,
                    id
                }
            })
            if (!role) {
                throw new Error('không tồn tại nhóm quyền')
            }
            return role.update({ del: 1 })
        } catch (err) {
            throw new Error(err)
        }
    }
}
export default new MidRole()