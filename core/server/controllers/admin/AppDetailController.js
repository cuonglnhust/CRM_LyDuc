import { MidAppDetail } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class AppDetailController {
    //AppDetail Controller
    createAppDetail = (req, res) => {
        let dataAppDetail = req.body;
        let { html_content, plain_text, link_app_ios, link_app_android } = dataAppDetail;
        if (!html_content || !plain_text || !link_app_ios || !link_app_android ) {
            return ResponseError(res, 'Require params')
        }
        MidAppDetail.createAppDetail(dataAppDetail)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getAllAppDetail = (req, res) => {
        let dataAppDetail = req.query;
        let { page, limit } = dataAppDetail;
        dataAppDetail.page = parseInt(page) || 0;
        dataAppDetail.limit = parseInt(limit) || 10;

        MidAppDetail.getAllAppDetail(dataAppDetail)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getAllAppDetailEmp = (req, res) => {
        let dataAppDetail = req.query;
        MidAppDetail.getAllAppDetailEmp(dataAppDetail)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getAllAppDetailCus = (req, res) => {
        let dataAppDetail = req.query;
        MidAppDetail.getAllAppDetailCus(dataAppDetail)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getAppDetailById = (req, res) => {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidAppDetail.getAppDetailById(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updateAppDetail = (req, res) => {
        let dataAppDetail = req.body;
        let { id,html_content, plain_text, link_app_ios, link_app_android } = dataAppDetail;
        if (!id || !link_app_ios || !html_content || !plain_text || !link_app_android ) {
            return ResponseError(res, 'Require params')
        }
        MidAppDetail.updateAppDetail(dataAppDetail)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    deleteAppDetail = (req, res) => {
        let { id } = req.body
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidAppDetail.deleteAppDetail(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }
}
export default new AppDetailController()