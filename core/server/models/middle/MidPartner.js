'use strict';
import {
    Partner
} from '../index'
import _ from 'lodash'

class MidPartner{

    createPartner = async (data) => {
        try {
            let partner = await Partner.create(data)
            if (!partner) {
                throw new Error("Tạo đối tác không thành công!")
            }
            return partner
        } catch (err) {
            throw new Error(err)
        }
    }

    updatePartner = async (data) => {
        try {
            let partner = await Partner.getPartnerById(data.id)
            if (!partner) {
                throw new Error("Không tìm thấy đối tác!")
            }
            return partner.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    deletePartner = async (data) => {
        try {
            let partner = await Partner.getPartnerById(data.id)
            if (!partner) {
                throw new Error("Không tìm thấy đối tác cần xóa!")
            }

            return partner.update({
                del: 1
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    getListPartner = async (data) => {
        try {
            let listPartner = await Partner.getListPartner(data);
            let total = await Partner.countListPartner(data);
            let number_page = data.limit ? Math.ceil(total / data.limit) : 1
            return {
                listPartner,
                total,
                number_page
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    getPartnerById = async (id) => {
        try {
            let partner = await Partner.getPartnerById(id)
            if (!partner) {
                throw new Error("Không tìm thấy đối tác !")
            }

            return partner
        } catch (err) {
            throw new Error(err)
        }
    }


}

export default new MidPartner()