'use strict';
import {
    MidServices
} from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class ServicesController {
    updateServices = (req, res) => {
        let dataPost = req.body
        let { service_id, service_category_id } = dataPost
        if (!service_id || !service_category_id) {
            return ResponseError(res, "Require params")
        }
        MidServices.updateServices(dataPost)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }
    getListServicesByCategory = (req, res) => {
        let dataPost = req.query;
        let {services_category_id} = dataPost
        MidServices.getListServicesByCategory(services_category_id)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getListServices = (req, res) => {
    
        MidServices.getListServices()
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getServicesById = (req, res) => {
        let dataQuery = req.query;
        let { id } = dataQuery;
        if (!parseInt(id)) {
            return ResponseError(res, 'Require params')
        }

        MidServices.getServicesById(parseInt(id))
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getServicesCategory = (req, res) => {
        let dataPost = req.query
        MidServices.getServicesCategory(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getServicesCategoryHot = (req, res) => {
        MidServices.getServicesCategoryHot()
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    createServicesCategory = async (req, res) => {
        let dataPost = req.body;
        let { title, description, image } = dataPost
        if (!title || !description || !image ) {
            return ResponseError(res, " Require params")
        }
        MidServices.createServicesCategory(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updateServicesCategory = (req, res) => {
        let dataPost = req.body
        let { id, title, description, image } = dataPost
        if (!id || !title || !description || !image ) {
            return ResponseError(res, "Thiếu trường dữ liệu!")
        }
        MidServices.updateServicesCategory(dataPost)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    deleteServicesCategory = (req, res) => {
        let dataPost = req.body
        let { id} = dataPost
        if (!id ) {
            return ResponseError(res, "Thiếu trường dữ liệu!")
        }
        MidServices.deleteServicesCategory(dataPost)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getServicesCategoryById = (req, res) => {
        let dataPost = req.query
        let { id } = dataPost
        if (!id ) {
            return ResponseError(res, "Thiếu trường dữ liệu!")
        }
        MidServices.getServicesCategoryById(id)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getServicesCategoryBySlug = (req, res) => {
        let dataPost = req.query
        let { slug } = dataPost
        if (!slug ) {
            return ResponseError(res, "Thiếu trường dữ liệu!")
        }
        MidServices.getServicesCategoryBySlug(slug)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getServicesCategoryBySlugSub = (req, res) => {
        let dataPost = req.query
        let { slug } = dataPost
        if (!slug ) {
            return ResponseError(res, "Thiếu trường dữ liệu!")
        }
        MidServices.getServicesCategoryBySlugSub(slug)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getServiceContent = (req, res) => {
        let dataQuery = req.query;
        let { service_category_id } = dataQuery;
        service_category_id = parseInt(service_category_id);
        if (!service_category_id) {
            return ResponseError(res, 'Require params')
        }
        MidServices.getServiceContent(service_category_id)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getServiceContentAPI = (req, res) => {
        let dataQuery = req.query;
        let { slug } = dataQuery;
        if (!slug) {
            return ResponseError(res, 'Require params')
        }
        MidServices.getServiceContentAPI(slug)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    updateServicesCategoryContent = (req, res) => {
        let dataPost = req.body;
        let { service_id, key } = dataPost;
        dataPost.service_id = parseInt(service_id);
        if (!service_id || !key) {
            return ResponseError(res, 'Require params')
        }
        MidServices.updateServicesCategoryContent(dataPost)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

}

export default new ServicesController()