'use strict';
import {
    MidAbout
} from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class AboutController {


    updateAbout = (req, res) => {
        let dataPost = req.body
        let { id, name, phone, hotline ,mobile , address, email } = dataPost
        if (! id || !name || !phone || !hotline || !address || !email || !mobile) {
            return ResponseError(res, "Thiếu trường dữ liệu!")
        }
        MidAbout.updateAbout(dataPost)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }
    getAbout = (req, res) => {
        MidAbout.getAbout()
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

}

export default new AboutController()