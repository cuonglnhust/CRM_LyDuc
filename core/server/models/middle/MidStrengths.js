import { Strengths } from '../'


class MidStrengths {
    //Strengths Middle
    async createStrengths(data) {
        try {
            let strengths = await Strengths.create(data)
            if (!strengths) {
                throw new Error("Tạo Strengths không thành công")
            }
            return strengths
        } catch (err) {
            throw new Error(err)
        }
    }

    async getAllStrengths(data) {
        try {
            let allStrengths = await Strengths.getAllStrengths(data)
            let total = await Strengths.countAllStrengths(data)
            let number_page = Math.ceil(total / data.limit)
            return { allStrengths, total, number_page }
        } catch (err) {
            throw new Error(err)
        }
    }

    getStrengthsById = async (id) => {
        try {
            let strengths = await Strengths.getStrengthsById(id)
            if (!strengths) {
                throw new Error("Không tìm thấy Strengths!")
            }
            return strengths
        } catch (err) {
            throw new Error(err)
        }
    }

    getStrengthsByWorker = async () => {
        try {
            let strengths = await Strengths.findAll({
                where: {
                    del: 0,
                    type: 1
                }
            })
            if (!strengths) {
                throw new Error('không tồn tại Strengths nào!')
            } return strengths
        } catch (err) {
            throw new Error(err)
        }
    }

    getStrengthsByCo = async () => {
        try {
            let strengths = await Strengths.findAll({
                where: {
                    del: 0,
                    type: 0
                }
            })
            if (!strengths) {
                throw new Error('không tồn tại Strengths nào!')
            } return strengths
        } catch (err) {
            throw new Error(err)
        }
    }

    updateStrengths = async (data) => {
        try {
            let strengths = await Strengths.getStrengthsById(data.id)
            if (!strengths) {
                throw new Error("Không tìm thấy Strengths!")
            }
            return strengths.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    deleteStrengths = async (id) => {
        try {
            let strengths = await Strengths.getStrengthsById(id)
            if (!strengths) {
                throw new Error("Không tìm thấy Strengths!")
            }
            return strengths.update({ del: 1 })
        } catch (err) {
            throw new Error(err)
        }
    }
}
export default new MidStrengths()