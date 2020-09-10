import { Banner } from '../'


class MidBanner {
    //Banner Middle
    async createBanner(data) {
        try {
            let banner = await Banner.create(data)
            if (!banner) {
                throw new Error("Tạo banner không thành công")
            }
            return banner
        } catch (err) {
            throw new Error(err)
        }
    }

    async getAllBanner(data) {
        try {
            let allBanner = await Banner.getAllBaneer(data)
            let total = await Banner.countAllBanner(data)
            let number_page = Math.ceil(total / data.limit)
            return { allBanner, total, number_page }
        } catch (err) {
            throw new Error(err)
        }
    }

    async getListBanner(data) {
        try {
            let allBanner = await Banner.getListBanner(data)
            return allBanner
        } catch (err) {
            throw new Error(err)
        }
    }

    async getListBannerDes(data) {
        try {
            let allBanner = await Banner.getListBannerDes(data)
            return allBanner
        } catch (err) {
            throw new Error(err)
        }
    }

    async getListBannerMob(data) {
        try {
            let allBanner = await Banner.getListBannerMob(data)
            return allBanner
        } catch (err) {
            throw new Error(err)
        }
    }

    getBannerById = async (id) => {
        try {
            let banner = await Banner.getBannerById(id)
            if (!banner) {
                throw new Error("Không tìm thấy banner!")
            }
            return banner
        } catch (err) {
            throw new Error(err)
        }
    }

    updateBanner = async (data) => {
        try {
            let banner = await Banner.getBannerById(data.id)
            if (!banner) {
                throw new Error("Không tìm thấy banner!")
            }
            return banner.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    deleteBanner = async (id) => {
        try {
            let banner = await Banner.getBannerById(id)
            if (!banner) {
                throw new Error("Không tìm thấy banner!")
            }
            return banner.update({ del: 1 })
        } catch (err) {
            throw new Error(err)
        }
    }
}
export default new MidBanner()