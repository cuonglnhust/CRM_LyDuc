import { MidSeo } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class SeoController {
   //Seo
   createSeo = (req, res) => {
    let dataBody = req.body
    let { name, content } = dataBody
    if (!name || !content) {
        ResponseError(res, 'Require params')
    }
    MidSeo.createSeo(dataBody)
        .then(result => {
            ResponseSuccess(res, result)
        }).catch(err => {
            ResponseError(res, err)
        })
}

getAllSeo = (req, res) => {
    MidSeo.getAllSeo()
        .then(result => {
            ResponseSuccess(res, result)
        }).catch(err => {
            ResponseError(res, err)
        })
}

updateSeo = (req, res) => {
    let dataBody = req.body
    let { id, name, content } = dataBody
    if (!id || !name || !content) {
        ResponseError(res, 'Require Params')
    }
    MidSeo.updateSeo(dataBody)
        .then(result => {
            ResponseSuccess(res, result)
        }).catch(err => {
            ResponseError(res, err)
        })
}

getSeoById = (req,res) => {
    let dataBody = req.body
    let {id} =dataBody
    if(!id) {
        ResponseError(res,"Require Params")
    }
    MidSeo.getSeoById(id)
        .then(result => {
            ResponseSuccess(res, result)
        }).catch(err => {
            ResponseError(res, err)
        })
}

deleteSeo = (req, res) => {
    let { id } = req.body
    MidSeo.deleteSeo(id)
        .then(result => {
            ResponseSuccess(res, result)
        }).catch(err => {
            ResponseError(res, err)
        })
}
}
export default new SeoController()