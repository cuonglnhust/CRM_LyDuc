'use strict';
import {
    MidNews
} from '../../models/middle'
import {
    getUserCurrent
  } from '../../libs/auth/auth';
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class NewsController {

    // News
    createNews = (req, res) => {

        getUserCurrent(req)
            .then(user => {
                let dataPost = req.body;
                let { title, description, html_content, plain_text, slug, category_id, publish_date } = dataPost
                dataPost.createdBy = user.id
                if (!title || !description || !html_content || !plain_text || !slug || !category_id || !publish_date) {
                    return ResponseError(res, " Require params")
                }
                MidNews.createNews(dataPost)
                    .then(ins => {
                        ResponseSuccess(res, ins)
                    }).catch(err => {
                        ResponseError(res, err)
                    })

            })
            .catch(err => {
                return ResponseError(res, err);
            });

    }

    updateNews = (req, res) => {
        let dataPost = req.body
        //let { id } = dataPost; // <=> let id = dataPost.id;
        let { id, title, description, html_content, plain_text, slug, publish_date, category_id } = dataPost
        if (!id || !title || !description || !html_content || !plain_text || !slug || !publish_date || !category_id) {
            return ResponseError(res, "Require params")
        }
        MidNews.updateNews(dataPost)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }
    getListNews = (req, res) => {
        let dataPost = req.query;
        let { page, limit } = dataPost;
        dataPost.page = parseInt(page) || 1;
        dataPost.limit = parseInt(limit) || 0
        MidNews.getListNews(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getListNewsContent = (req, res) => {
        let dataPost = req.query;
        let { page, limit } = dataPost;
        dataPost.page = parseInt(page) || 1;
        dataPost.limit = parseInt(limit) || 0
        MidNews.getListNewsContent(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getNewsById = (req, res) => {
        let dataQuery = req.query;
        let { id } = dataQuery;
        if (!parseInt(id)) {
            return ResponseError(res, 'Require params')
        }

        MidNews.getNewsById(parseInt(id))
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getNewsByCategorySlug = (req, res) => {
        let dataQuery = req.query;
        let { slug } = dataQuery;

        MidNews.getNewsByCategorySlug(slug)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    deleteNews = (req, res) => {
        let dataPost = req.body
        let { id } = dataPost
        if (!id) {
            return ResponseError(res, "Require params")
        }
        MidNews.deleteNews(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }


    // Category

    createCategory = async (req, res) => {
        let dataPost = req.body;
        let { title, description } = dataPost
        if (!title || !description) {
            return ResponseError(res, " Require params")
        }
        MidNews.createCategory(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updateCategory = (req, res) => {
        let dataPost = req.body
        let { id, title, description } = dataPost
        if (!id || !title || !description) {
            return ResponseError(res, "Thiếu trường dữ liệu!")
        }
        MidNews.updateCategory(dataPost)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    deleteCategory = (req, res) => {
        let dataPost = req.body
        let { id } = dataPost
        if (!id) {
            return ResponseError(res, "Require params")
        }
        MidNews.deleteCategory(dataPost)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }


    getCategory = (req, res) => {
        MidNews.getCategory()
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getCategoryApi = (req, res) => {
        MidNews.getCategoryApi()
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }



    getNewsBySlug = (req, res) => {
        let dataQuery = req.query;
        let { slug, title } = dataQuery;
        if (!slug) {
            return ResponseError(res, 'Require params')
        }

        MidNews.getNewsBySlug(dataQuery)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getAllNewsByAllCategory = (req, res) => {
        let dataQuery = req.query
        MidNews.getAllNewsByAllCategory(dataQuery)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getNewsByNewsSlug = (req, res) => {
        let dataQuery = req.query;
        let { slug } = dataQuery;
        if (!slug) {
            return ResponseError(res, 'Require params')
        }

        MidNews.getNewsByNewsSlug(slug)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getNewsRecruitment = (req, res) => {
        let dataQuery = req.query
        MidNews.getNewsRecruitment(dataQuery)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getNewsHot = (req, res) => {
        let dataQuery = req.query
        MidNews.getNewsHot(dataQuery)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getListNewsHotByCategory = (req, res) =>{
        let dataQuery = req.query
        MidNews.getListNewsHotByCategory(dataQuery)
            .then(ins => {
                ResponseSuccess(res, ins)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }
}

export default new NewsController()