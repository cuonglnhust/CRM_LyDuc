'use strict';
import {
    MidPartner
} from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class PartnerController {
    createPartner = (req, res) => {
        let dataPost = req.body;
        
        let { name_partner, link_partner, image } = dataPost
        if (!name_partner || !link_partner || !image ) {
            return ResponseError(res, " Require params")
        }
        MidPartner.createPartner(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updatePartner = (req, res) => {
        let dataPost = req.body
        let { id, name_partner, link_partner, image } = dataPost
        if (!id || !name_partner || !link_partner || !image ) {
            return ResponseError(res, "Require params")
        }
        MidPartner.updatePartner(dataPost)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }
    getListPartner = (req, res) => {
        let dataPost = req.query;
        let { page, limit } = dataPost;
        dataPost.page = parseInt(page) || 1;
        dataPost.limit = parseInt(limit) || 0
        MidPartner.getListPartner(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getPartnerById = (req, res) => {
        let dataQuery = req.query;
        let { id } = dataQuery;
        if (!parseInt(id)) {
            return ResponseError(res, 'Require params')
        }

        MidPartner.getPartnerById(parseInt(id))
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    deletePartner = (req, res) => {
        let dataPost = req.body
        let { id } = dataPost
        if (!id) {
            return ResponseError(res, "Require params")
        }
        MidPartner.deletePartner(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }


 

}

export default new PartnerController()