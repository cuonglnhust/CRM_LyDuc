import { MidPermission } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'
import { getUserCurrent } from '../../libs/auth/auth'

class PermissionController {
    createPermission = (req, res) => {
        let dataPermission = req.body;
        let { name, status, action, object } = dataPermission
        if (!name || !status || !action || !object) {
            return ResponseError(res, 'Require Params')
        }
        MidPermission.createPermission(dataPermission)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getPermission = (req, res) => {
        let dataPermission = req.query;
        let { page, limit } = dataPermission;
        dataPermission.page = parseInt(page) || 0;
        dataPermission.limit = parseInt(limit) || 10;
        MidPermission.getPermission(dataPermission)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getPermissionById = (req, res) => {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidPermission.getPermissionById(id)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updatePermission = (req, res) => {
        let dataPermission = req.body
        let { id, name, status, action, object } = dataPermission
        if (!id || !name || !status || !action || !object) {
            return ResponseError(res, 'Require Params')
        }
        MidPermission.updatePermission(dataPermission)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    deletePermission = (req, res) => {
        let { id } = req.body
        if (!id) {
            return ResponseError(res, 'Permission không tồn tại!')
        }
        MidPermission.deletePermission(id)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getRolePermission = (req, res) => {
        let { role_id } = req.query;
        if (!role_id) {
            return ResponseError(res, 'Require params')
        }

        MidPermission.getRolePermission(parseInt(role_id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updateRolePermission = (req, res) => {
        let { role_id, permission_id } = req.body;
        if (!parseInt(role_id)) {
            return ResponseError(res, 'Require params')
        }
        MidPermission.updateRolePermission(parseInt(role_id), permission_id)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getPermissionUser = (req, res) => {
        getUserCurrent(req).then(user => {
            MidPermission.getPermissionUser(user.id)
                .then(result => {
                    ResponseSuccess(res, result)
                }).catch(err => {
                    ResponseError(res, err)
                })
        }).catch(err => {
            ResponseError(res, err)
        })
    }
}
export default new PermissionController()