import { ProcessService,ProcessWorker } from '../'


class MidProcess {
    //ProcessWorker
    async createProcessWorker(data) {
        try {
            let processWorker = await ProcessWorker.create(data)
            if (!processWorker) {
                throw new Error("Tạo processWorker không thành công")
            }
            return processWorker
        } catch (err) {
            throw new Error(err)
        }
    }

    async getAllProcessWorker(data) {
        try {
            let allProcessWorker = await ProcessWorker.getAllProcessWorker(data)
            let total = await ProcessWorker.countAllProcessWorker(data)
            let number_page = Math.ceil(total / data.limit)
            return { allProcessWorker, total, number_page }
        } catch (err) {
            throw new Error(err)
        }
    }

    getProcessWorkerById = async (id) => {
        try {
            let processWorker = await ProcessWorker.getProcessWorkerById(id)
            if (!processWorker) {
                throw new Error("Không tìm thấy processWorker!")
            }
            return processWorker
        } catch (err) {
            throw new Error(err)
        }
    }

    updateProcessWorker = async (data) => {
        try {
            let processWorker = await ProcessWorker.getProcessWorkerById(data.id)
            if (!processWorker) {
                throw new Error("Không tìm thấy processWorker!")
            }
            return processWorker.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    deleteProcessWorker = async (id) => {
        try {
            let processWorker = await ProcessWorker.getProcessWorkerById(id)
            if (!processWorker) {
                throw new Error("Không tìm thấy processWorker!")
            }
            return processWorker.update({ del: 1 })
        } catch (err) {
            throw new Error(err)
        }
    }

    //ProcessService
    async createProcessService(data) {
        try {
            let processService = await ProcessService.create(data)
            if (!processService) {
                throw new Error("Tạo processService không thành công")
            }
            return processService
        } catch (err) {
            throw new Error(err)
        }
    }

    async getAllProcessService(data) {
        try {
            let allProcessService = await ProcessService.getAllProcessService(data)
            let total = await ProcessService.countAllProcessService(data)
            let number_page = Math.ceil(total / data.limit)
            return { allProcessService, total, number_page }
        } catch (err) {
            throw new Error(err)
        }
    }

    getProcessServiceById = async (id) => {
        try {
            let processService = await ProcessService.getProcessServiceById(id)
            if (!processService) {
                throw new Error("Không tìm thấy processService!")
            }
            return processService
        } catch (err) {
            throw new Error(err)
        }
    }

    updateProcessService = async (data) => {
        try {
            let processService = await ProcessService.getProcessServiceById(data.id)
            if (!processService) {
                throw new Error("Không tìm thấy processService!")
            }
            return processService.update(data)
        } catch (err) {
            throw new Error(err)
        }
    }

    deleteProcessService = async (id) => {
        try {
            let processService = await ProcessService.getProcessServiceById(id)
            if (!processService) {
                throw new Error("Không tìm thấy processService!")
            }
            return processService.update({ del: 1 })
        } catch (err) {
            throw new Error(err)
        }
    }
}
export default new MidProcess()