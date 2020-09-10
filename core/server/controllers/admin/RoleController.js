import { MidRole } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class RoleController {
    createRole = (req, res) => {
        let dataRole = req.body;
        let { name, description, status } = dataRole
        if (!name || !description || !status) {
            return ResponseError(res, 'Require Params')
        }
        MidRole.createRole(dataRole)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getRole = (req, res) => {
        MidRole.getRole()
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getRoleById = (req, res) => {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Role không tồn tại!')
        }
        MidRole.getRoleById(id)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updateRole = (req, res) => {
        let dataRole = req.body
        let { id, name, description, status } = dataRole
        if (!id || !name || !description || !status) {
            return ResponseError(res, 'Require Params')
        }
        MidRole.updateRole(dataRole)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    deleteRole = (req, res) => {
        let { id } = req.body
        if (!id) {
            return ResponseError(res, 'Role không tồn tại!')
        }
        MidRole.deleteRole(id)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }
}
export default new RoleController()