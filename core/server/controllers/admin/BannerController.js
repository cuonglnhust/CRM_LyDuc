import { MidBanner } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class BannerController {
    //Banner Controller
    createBanner = (req, res) => {
        let dataBanner = req.body;
        let { image } = dataBanner;
        if (!image ) {
            return ResponseError(res, 'Require params')
        }
        MidBanner.createBanner(dataBanner)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getAllBanner = (req, res) => {
        let dataBanner = req.query;
        let { page, limit } = dataBanner;
        dataBanner.page = parseInt(page) || 0;
        dataBanner.limit = parseInt(limit) || 10;

        MidBanner.getAllBanner(dataBanner)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getBannerById = (req, res) => {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidBanner.getBannerById(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updateBanner = (req, res) => {
        let dataBanner = req.body;
        let { id, image } = dataBanner;
        if (!id || !image ) {
            return ResponseError(res, 'Require params')
        }
        MidBanner.updateBanner(dataBanner)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    deleteBanner = (req, res) => {
        let { id } = req.body
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidBanner.deleteBanner(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getListBanner = (req, res) => {
        let dataBanner = req.query;

        MidBanner.getListBanner(dataBanner)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getListBannerDes = (req, res) => {
        let dataBanner = req.query;

        MidBanner.getListBannerDes(dataBanner)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getListBannerMob = (req, res) => {
        let dataBanner = req.query;

        MidBanner.getListBannerMob(dataBanner)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }
}
export default new BannerController()