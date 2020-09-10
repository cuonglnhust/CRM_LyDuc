import {
    Permission,
    Role_permission,
    User_Role
} from '../'

class MidPermission {

    // Permission
    async createPermission(data) {
        try {
            let permission = await Permission.findOne({
                where: {
                    action: data.action
                }
            })
            if (permission) {
                throw new Error('Đã tồn tại permission')
            } else {
                permission = await Permission.create(data)
                if (!permission) {
                    throw new Error('Permission không tồn tại')
                }
            }
            return permission
        } catch (err) {
            throw new Error(err)
        }
    }

    getPermission = async (dataPermission) => {
        try {
            let allPermission = await Permission.getAllPermission(dataPermission)
            let total = await Permission.countAllPermission(dataPermission)
            let number_page = Math.ceil(total / dataPermission.limit)
            return { allPermission, total, number_page }
        } catch (err) {
            throw new Error(err)
        }
    }

    getPermissionById = async (id) => {
        try {
            let permission = await Permission.findOne({
                where: {
                    del: 0,
                    id
                }
            })
            if (!permission) {
                throw new Error('không tồn tại Permission')
            }
            return permission
        } catch (err) {
            throw new Error(err)
        }
    }

    updatePermission = async (data) => {
        try {
            let permission = await Permission.findOne({
                where: {
                    del: 0,
                    id: data.id
                }
            })
            if (!permission) {
                throw new Error('không tồn tại Permission')
            }
            let checkPermission = await Permission.findOne({
                where: {
                    action: data.action
                }
            })
            if (permission.id != checkPermission.id) {
                throw new Error('Đã tồn tại Permission')
            }
            return permission.update(data)
        } catch (err) {
            throw new Error(err)
        }

    }

    deletePermission = async (id) => {
        try {
            let permission = await Permission.findOne({
                where: {
                    del: 0,
                    id
                }
            })
            if (!permission) {
                throw new Error('không tồn tại Permission')
            }
            return permission.update({ del: 1 })
        } catch (err) {
            throw new Error(err)
        }
    }

    // Role Permission

    getRolePermission = async (role_id) => {
        try {
            return Role_permission.findOne({
                where: {
                    role_id,
                    del: 0
                }
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    updateRolePermission = async (role_id, permission_id) => {
        try {
            let role_permission = await Role_permission.findOne({
                where: {
                    role_id,
                    del: 0
                }
            })
            if (!role_permission) {
                role_permission = await Role_permission.create({
                    role_id,
                    permission_id,
                    del: 0
                })
            } else {
                role_permission.update({
                    permission_id
                })
            }
            return role_permission
        } catch (err) {
            throw new Error(err)
        }
    }

    checkPermissions = async (user_id, action) => {
        try {
            let role = await User_Role.getUserById(user_id)
            if (!role) {
                throw new Error('Tài khoản của bạn không đủ quyền thực hiện hành động này!')
            }
            if (role.role_id == 1) {
                return true
            }
            let role_permission = await Role_permission.findOne({
                where: {
                    role_id: role.role_id,
                    del: 0
                }
            })
            if (!role_permission) {
                throw new Error("Tài khoản của bạn không đủ quyền thực hiện hành động này!")
            }
            let permission = await Permission.findOne({
                where: {
                    action,
                    del: 0
                }
            })

            if (!permission) {
                throw new Error('Tài khoản của bạn không đủ quyền thực hiện hành động này!')
            }
            let permission_id = role_permission.permission_id;
            if (permission_id.indexOf(permission.id) == -1) {
                throw new Error('Tài khoản của bạn không đủ quyền thực hiện hành động này!')
            }
            return true
        } catch (err) {
            throw new Error(err)
        }
    }

    getPermissionUser = async (user_id) => {
        try {
            let role = await User_Role.getUserById(user_id)
            if (!role) {
                return []
            }
            let listPermission = []
            if (role.role_id == 1) {
                let data = await Permission.findAll({
                    where: {
                        del: 0,
                        status: 1
                    }
                })
                listPermission = data.map(it => {
                    return it.action
                })
                return listPermission
            }
            let role_permission = await Role_permission.findOne({
                where: {
                    role_id: role.role_id,
                    del: 0
                }
            })
            if (!role_permission) {
                return []
            }
            let p_work = [];
            role_permission.permission_id.map(it => {
                p_work.push(Permission.findOne({
                    where: {
                        id: it,
                        del: 0,
                        status: 1
                    }
                }))
            })
            let data = await Promise.all(p_work)
            listPermission = data.map(it => {
                return it.action
            })
            return listPermission
        } catch (err) {
            throw new Error(err)
        }
    }
}
export default new MidPermission()