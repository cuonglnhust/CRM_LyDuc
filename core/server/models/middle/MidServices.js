'use strict';
import {
    Services, Services_Category,
    Services_Category_Content
} from '../index'
import _ from 'lodash'

class MidServices {


    updateServices = async (data) => {
        try {
            let services = await Services.getServicesByServiceId(data.service_id)
            if (!services) {
                services = await Services.create(data)
            } else {
                await services.update(data)
            }
            return services
        } catch (err) {
            throw new Error(err)
        }
    }


    getListServicesByCategory = async (services_category_id) => {
        try {
            let listServices = await Services.getListServicesByCategory(services_category_id);
            return {
                listServices
            }
        } catch (err) {
            throw new Error(err)
        }
    }
    getListServices = async () =>{
        try{
            let listServices = await Services.getListServices();
            return {
                listServices
            }
        } catch (err){
            throw new Error(err)
        }
    }

    getServicesById = async (id) => {
        return Services.getServicesByServiceId(id)
    }

    getServicesCategory = async (data) => {
        try {
            let [listServices, total] = await Promise.all([
                Services_Category.getServicesCategory(data),
                Services_Category.countListServicesCategory(data)
            ])
            
            let number_page = data.limit ? Math.ceil(total / data.limit) : 1
            return {
                listServices,
                total,
                number_page
            }
        } catch (err) {
            throw new Error(err)
        }

    }

    getServicesCategoryHot = async () => {
        try {
            let services_category = await Services_Category.getServicesCategoryHot()
            return services_category
        } catch (err) {
            throw new Error(err)
        }

    }

    getServicesCategoryById = async (id) => {
        let services = await Services_Category.getServicesCategoryById(parseInt(id) )
        return services
    }

    getServicesCategoryBySlug = async (id) => {
        return Services_Category.getServicesCategoryBySlug(id)
    }

    getServicesCategoryBySlugSub = async (slug) => {
        let services_category = await Services_Category.getServicesCategoryBySlug(slug)
        let p_w = services_category.services_other.map( services =>{
            return Services_Category.getServicesCategoryById(parseInt(services.value) )
        })

        let services_sub_other = await Promise.all(p_w)

        return {
            services_category,
            services_sub_other
        }
    }

    createServicesCategory = async (data) => {
        let dataCreate = Object.assign(data, {
            del: 0
        })
        return Services_Category.create(dataCreate)
    }

    updateServicesCategory = async (data) => {
        try {
            let services_category = await Services_Category.getServicesCategoryById(data.id)
            if (!services_category) {
                throw new Error("Không tìm thấy category!")
            }
            return services_category.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    deleteServicesCategory = async (data) => {
        try {
            let services_category = await Services_Category.getServicesCategoryById(data.id)
            if (!services_category) {
                throw new Error("Không tìm thấy category!")
            }
            return services_category.update({
                del: 1
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    getServiceContent = async (services_category_id) => {
        let listServicesContent = await Services_Category_Content.findAll({
            where: {
                services_category_id
            }
        })
        let servicesCategory = await Services_Category.getServicesCategoryById(services_category_id)
        return{
            servicesCategory,
            listServicesContent
        }
    }

    getServiceContentAPI = async (slug) => {
        let servicesCategory = await Services_Category.getServicesCategoryBySlug(slug)
        if (!servicesCategory) {
            throw new Error("Không tìm thấy category!")
        }
        let listServicesContent = await Services_Category_Content.findAll({
            where: {
                services_category_id:servicesCategory.id
            }
        })
        return{
            servicesCategory,
            listServicesContent
        }
    }
    updateServicesCategoryContent = async (data) => {
        try {
            let { service_id, key, html_content } = data;
            let content = await Services_Category_Content.findOne({
                where: {
                    key,
                    services_category_id: service_id
                }
            })
            if (content) {
                content.update({
                    data: html_content
                })
            } else {
                content = await Services_Category_Content.create({
                    key,
                    data: html_content,
                    services_category_id: service_id
                })
            }
            return content
        } catch (err) {
            throw new Error(err)
        }
    }

}

export default new MidServices()