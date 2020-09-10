import { MidIntroductions } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class IntroductionsController {
    //Introductions Controller
    createIntroductions = (req, res) => {
        let dataIntroductions = req.body;
        let { title, html_content,plain_text, type } = dataIntroductions;
        if (!title || !html_content || !type || !plain_text ) {
            return ResponseError(res, 'Require params')
        }
        MidIntroductions.createIntroductions(dataIntroductions)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getAllIntroductions = (req, res) => {
        let dataIntroductions = req.query;
        let { page, limit } = dataIntroductions;
        dataIntroductions.page = parseInt(page) || 0;
        dataIntroductions.limit = parseInt(limit) || 10;

        MidIntroductions.getAllIntroductions(dataIntroductions)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getIntroductionsById = (req, res) => {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidIntroductions.getIntroductionsById(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }
    getIntroductionsByCo = (req, res) => {
        MidIntroductions.getIntroductionsByCo()
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getIntroductionsByWorker = (req, res) => {
        MidIntroductions.getIntroductionsByWorker()
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }
    updateIntroductions = (req, res) => {
        let dataIntroductions = req.body;
        let { id, title, html_content,plain_text, type } = dataIntroductions;
        if (!id || !title || !html_content || !type || !plain_text  ) {
            return ResponseError(res, 'Require params')
        }
        MidIntroductions.updateIntroductions(dataIntroductions)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    deleteIntroductions = (req, res) => {
        let { id } = req.body
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidIntroductions.deleteIntroductions(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }
}
export default new IntroductionsController()