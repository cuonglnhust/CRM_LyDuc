'use strict';
import {
    News,
    Category
} from '../index'
import _ from 'lodash'
import { Op } from 'sequelize';

class MidNews {

    // News
    createNews = async (data) => {

        try {
            let news = await News.create(data)
            if (!news) {
                throw new Error("Tạo tin tức không thành công!")
            }
            return news
        } catch (err) {
            throw new Error(err)
        }
    }

    updateNews = async (data) => {
        try {
            let news = await News.getNewsById(data.id)
            if (!news) {
                throw new Error("Không tìm thấy tin!")
            }
            return news.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    deleteNews = async (data) => {
        try {
            let news = await News.getNewsById(data.id)
            if (!news) {
                throw new Error("Không tìm thấy tin cần xóa!")
            }

            return news.update({
                del: 1
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    getListNews = async (data) => {
        try {
            let listNews = await News.getListNews(data);
            let total = await News.countListNews(data);
            let number_page = data.limit ? Math.ceil(total / data.limit) : 1
            return {
                listNews,   
                total,
                number_page
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    getListNewsContent = async (data) => {
        try {
            let listNews = await News.getListNewsContent(data);
            return listNews

        } catch (err) {
            throw new Error(err)
        }
    }

    getNewsById = async (id) => {
        try {
            let news = await News.getNewsById(id)
            if (!news) {
                throw new Error("Không tìm thấy tin !")
            }

            return news
        } catch (err) {
            throw new Error(err)
        }
    }

    getNewsByCategorySlug = async (slug) => {
        try {
            let news = await News.getNewsByCategorySlug(slug)
            if (!news) {
                throw new Error("Không tìm thấy tin !")
            }

            return news
        } catch (err) {
            throw new Error(err)
        }
    }


    createCategory = async (data) => {
        let dataCreate = Object.assign(data, {
            del: 0
        })
        return Category.create(dataCreate)
    }

    updateCategory = async (data) => {
        try {
            let category = await Category.getCategoryById(data.id)
            if (!category) {
                throw new Error("Không tìm thấy category!")
            }
            return category.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }
    
    deleteCategory = async (data) => {
        try {
            let category = await Category.getCategoryById(data.id)
            if (!category) {
                throw new Error("Không tìm thấy danh mục tin cần xóa!")
            }

            return category.update({
                del: 1
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    getCategory = async () => {
        try {
            let category = await Category.findAll({
                where: {
                    del: 0
                }
            })
            return category
        } catch (err) {
            throw new Error(err)
        }

    }
    getCategoryApi = async () => {
        try {
            let category = await Category.findAll({
                where: {
                    del: 0,
                    isRecruitment: 0
                }
            })
            return category
        } catch (err) {
            throw new Error(err)
        }

    }


    getNewsBySlug = async (data) => {
        try {
            let category = await Category.getCategoryBySlug(data.slug)

            if (!category) {
                throw new Error("Không tìm thấy loại tin này !")
            }
            let title = category.title
            let titleNews = data.title
            let category_id = category.id
            let dataNews = { titleNews, category_id }
            let news = await News.getNewsCate(dataNews)
            if (!news) {
                throw new Error("Không tìm thấy tin !")
            }

            return {
                title,
                news

            }
        } catch (err) {
            throw new Error(err)
        }
    }

    getNewsBySlugCategory = async (data) => {
        try {
            let news = await News.getNewsBySlugCategory(data)
            if (!news) {
                throw new Error("Không tìm thấy tin !")
            }

            return news
        } catch (err) {
            throw new Error(err)
        }
    }

    getAllNewsByAllCategory = async (data) => {
        try {
            let listCategory = await Category.getListCategory()
            if (!listCategory || listCategory.lenght <= 0) {
                throw new Error("Không có thể loại tin nào !")
            }
            let list = listCategory.map(async category => {
                let category_id = category.id
                let title = data.title
                let dataNews = { category_id, title }
                let listNews = await News.getNewsByCategoryId(dataNews)
                category = category.toJSON();
                category.listNews = listNews
                return category
            })

            return Promise.all(list)
        } catch (err) {
            throw new Error(err)
        }
    }

    getNewsByNewsSlug = async (data) => {
        try {
            let news = await News.getNewsBySlug(data)
            if (!news) {
                throw new Error("Không tìm thấy tin !")
            }
            return news
        } catch (err) {
            throw new Error(err)
        }
    }

    getNewsRecruitment = async (data) => {
        try {
            let recruitment = await Category.getCategoryRecruitment()
            data.category_id = recruitment.id
            let news = await News.getNewsRecruitment(data)
            if (!news) {
                throw new Error("Không tìm thấy tin !")
            }
            return news
        } catch (err) {
            throw new Error(err)
        }
    }

    getNewsHot = async (data) => {
        try {
            let result = []
            let listNews = []
            result = [
                News.getNewsHotLyDuc(data),
                News.getNewsHotRecruitment(data),
                News.getNewsHotMarket(data),
            ]
            await Promise.all(result).then(data => {
                listNews = data
            })
            return listNews
        } catch (err) {
            throw new Error(err)
        }
    }
    getListNewsHotByCategory = async (data) => {
        try {
            let listCategory = await Category.getListCategoryPageDetail(data)
            if (!listCategory.length) {
                throw new Error("Không có danh mục tin nào khác!")
            }
            let listRessult = await listCategory.map(async category => {
                let list_news = await News.getListNewsHot(category.id)
                return { category, list_news };
            })
            listRessult = await Promise.all(listRessult)
            return listRessult
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default new MidNews()