import { Introductions } from '../'


class MidIntroductions {
    //Introductions Middle
    async createIntroductions(data) {
        try {
            let introductions = await Introductions.create(data)
            if (!introductions) {
                throw new Error("Tạo Introductions không thành công")
            }
            return introductions
        } catch (err) {
            throw new Error(err)
        }
    }

    async getAllIntroductions(data) {
        try {
            let allIntroductions = await Introductions.getAllIntroductions(data)
            let total = await Introductions.countAllIntroductions(data)
            let number_page = Math.ceil(total / data.limit)
            return { allIntroductions, total, number_page }
        } catch (err) {
            throw new Error(err)
        }
    }

    getIntroductionsById = async (id) => {
        try {
            let introductions = await Introductions.getIntroductionsById(id)
            if (!introductions) {
                throw new Error("Không tìm thấy Introductions!")
            }
            return introductions
        } catch (err) {
            throw new Error(err)
        }
    }
    getIntroductionsByWorker = async () => {
        try {
            let introductions = await Introductions.findAll({
                where: {
                    del: 0,
                    type: 1
                }
            })
            if (!introductions) {
                throw new Error('không tồn tại Introductions nào!')
            } return introductions
        } catch (err) {
            throw new Error(err)
        }
    }

    getIntroductionsByCo = async () => {
        try {
            let introductions = await Introductions.findAll({
                where: {
                    del: 0,
                    type: 0
                }
            })
            if (!introductions) {
                throw new Error('không tồn tại Introductions nào!')
            } return introductions
        } catch (err) {
            throw new Error(err)
        }
    }
    updateIntroductions = async (data) => {
        try {
            let introductions = await Introductions.getIntroductionsById(data.id)
            if (!introductions) {
                throw new Error("Không tìm thấy Introductions!")
            }
            return introductions.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    deleteIntroductions = async (id) => {
        try {
            let introductions = await Introductions.getIntroductionsById(id)
            if (!introductions) {
                throw new Error("Không tìm thấy Introductions!")
            }
            return introductions.update({ del: 1 })
        } catch (err) {
            throw new Error(err)
        }
    }
}
export default new MidIntroductions()