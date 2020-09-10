import { Seo } from '../'


class MidSeo {
    createSeo = async (data) => {
        try {
            let seo = await Seo.create(data)
            if (!seo) {
                throw new Error('Tạo seo không thành công!')
            }
            return seo
        } catch (err) {
            throw new Error(err)
        }
    }

    getAllSeo = async () => {
        try {
            let seo = await Seo.getAllSeo()
            if (!seo) {
                throw new Error('không tồn tại seo nào!')
            }
            return seo

        } catch (err) {
            throw new Error(err)
        }
    }

    updateSeo = async (data) => {
        try {
            let seo = await Seo.findOne({
                where: {
                    del: 0,
                    id: data.id
                }
            })
            if (!seo) {
                throw new Error('không tồn tại seo cần sửa!')
            } return seo.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    getStrengthsById = async (id) => {
        try {
            let seo = await Seo.findOne({
                where: {
                    del: 0,
                    id: data.id
                }
            })
            if (!seo) {
                throw new Error('không tồn tại seo!')
            }
            return seo
        } catch (err) {
            throw new Error(err)
        }
    }

    deleteSeo = async (id) => {
        try {
            let seo = await Seo.findOne({
                where: {
                    del: 0,
                    id
                }
            })
            if (!seo) {
                throw new Error('không tồn tại !')
            } return seo.update({ del: 1 })
        } catch (err) {
            throw new Error(err)
        }
    }

}
export default new MidSeo()