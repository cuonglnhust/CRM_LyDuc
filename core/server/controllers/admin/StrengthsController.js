import { MidStrengths } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class StrengthsController {
    //Strengths Controller
    createStrengths = (req, res) => {
        let dataStrengths = req.body;
        let { title, html_content, plain_text, image } = dataStrengths;
        if (!title || !html_content  || !image ||!plain_text ) {
            return ResponseError(res, 'Require params')
        }
        MidStrengths.createStrengths(dataStrengths)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getAllStrengths = (req, res) => {
        let dataStrengths = req.query;
        let { page, limit } = dataStrengths;
        dataStrengths.page = parseInt(page) || 0;
        dataStrengths.limit = parseInt(limit) || 10;

        MidStrengths.getAllStrengths(dataStrengths)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getStrengthsById = (req, res) => {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidStrengths.getStrengthsById(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }



    getStrengthsByCo = (req, res) => {
        MidStrengths.getStrengthsByCo()
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getStrengthsByWorker = (req, res) => {
        MidStrengths.getStrengthsByWorker()
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updateStrengths = (req, res) => {
        let dataStrengths = req.body;
        let { id,title, html_content, plain_text, image } = dataStrengths;
        if (!id || !title || !html_content || !image ||!plain_text ) {
            return ResponseError(res, 'Require params')
        }
        MidStrengths.updateStrengths(dataStrengths)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    deleteStrengths = (req, res) => {
        let { id } = req.body
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidStrengths.deleteStrengths(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }
}
export default new StrengthsController()