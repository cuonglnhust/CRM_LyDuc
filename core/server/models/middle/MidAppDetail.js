import { AppDetail } from '../'


class MidAppDetail {
    //AppDetail Middle
    async createAppDetail(data) {
        try {
            if (parseInt(data.type) == 0) {
                let appDetailCus = await AppDetail.getAllAppDetailCus(data)
                if (appDetailCus) {
                    throw new Error("Tạo AppDetail không thành công,bạn đã tồn tại một AppDetail của khách hàng")
                } else {
                    let appDetail = await AppDetail.create(data)
                    if (!appDetail) {
                        throw new Error("Tạo AppDetail không thành công")
                    }
                    return appDetail
                }
            }else {
                let appDetailEmp = await AppDetail.getAllAppDetailEmp(data)
                if (appDetailEmp) {
                    throw new Error("Tạo AppDetail không thành công,bạn đã tồn tại một AppDetail của thợ")
                } else {
                    let appDetailEmployee = await AppDetail.create(data)
                    if (!appDetailEmployee) {
                        throw new Error("Tạo AppDetail không thành công")
                    }
                    return appDetailEmployee
                }
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    async getAllAppDetail(data) {
        try {
            let allAppDetail = await AppDetail.getAllAppDetail(data)
            let total = await AppDetail.countAllAppDetail(data)
            let number_page = Math.ceil(total / data.limit)
            return { allAppDetail, total, number_page }
        } catch (err) {
            throw new Error(err)
        }
    }

    async getAllAppDetailEmp(data) {
        try {
            let allAppDetail = await AppDetail.getAllAppDetailEmp(data)
            return allAppDetail
        } catch (err) {
            throw new Error(err)
        }
    }
    async getAllAppDetailCus(data) {
        try {
            let allAppDetail = await AppDetail.getAllAppDetailCus(data)
            return allAppDetail
        } catch (err) {
            throw new Error(err)
        }
    }

    getAppDetailById = async (id) => {
        try {
            let appDetail = await AppDetail.getAppDetailById(id)
            if (!appDetail) {
                throw new Error("Không tìm thấy AppDetail!")
            }
            return appDetail
        } catch (err) {
            throw new Error(err)
        }
    }

    updateAppDetail = async (data) => {
        try {
            let appDetail = await AppDetail.getAppDetailById(data.id)
            if (!appDetail) {
                throw new Error("Không tìm thấy AppDetail!")
            }
            return appDetail.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    deleteAppDetail = async (id) => {
        try {
            let appDetail = await AppDetail.getAppDetailById(id)
            if (!appDetail) {
                throw new Error("Không tìm thấy AppDetail!")
            }
            return appDetail.update({ del: 1 })
        } catch (err) {
            throw new Error(err)
        }
    }
}
export default new MidAppDetail()