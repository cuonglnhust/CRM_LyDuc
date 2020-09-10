import { MidProcess } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class ProcessController {
    //ProcessWorker
    createProcessWorker = (req, res) => {
        let dataProcessWorker = req.body;
        let { step_number, name, description, image } = dataProcessWorker;
        if (!step_number || !name || !description || !image ) {
            return ResponseError(res, 'Require params')
        }
        MidProcess.createProcessWorker(dataProcessWorker)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getAllProcessWorker = (req, res) => {
        let dataProcessWorker = req.query;
        let { page, limit } = dataProcessWorker;
        dataProcessWorker.page = parseInt(page) || 0;
        dataProcessWorker.limit = parseInt(limit) || 10;

        MidProcess.getAllProcessWorker(dataProcessWorker)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getProcessWorkerById = (req, res) => {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidProcess.getProcessWorkerById(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updateProcessWorker = (req, res) => {
        let dataProcessWorker = req.body;
        let { id, step_number, name, description, image } = dataProcessWorker;
        if (!id || !step_number || !name || !description || !image ) {
            return ResponseError(res, 'Require params')
        }
        MidProcess.updateProcessWorker(dataProcessWorker)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    deleteProcessWorker = (req, res) => {
        let { id } = req.body
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidProcess.deleteProcessWorker(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    //ProcessService

    createProcessService = (req, res) => {
        let dataProcessService = req.body;
        let { step_number, name, description, image } = dataProcessService;
        if (!step_number || !name || !description || !image ) {
            return ResponseError(res, 'Require params')
        }
        MidProcess.createProcessService(dataProcessService)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getAllProcessService = (req, res) => {
        let dataProcessService = req.query;
        let { page, limit } = dataProcessService;
        dataProcessService.page = parseInt(page) || 0;
        dataProcessService.limit = parseInt(limit) || 10;

        MidProcess.getAllProcessService(dataProcessService)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getProcessServiceById = (req, res) => {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidProcess.getProcessServiceById(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    updateProcessService = (req, res) => {
        let dataProcessService = req.body;
        let { id, step_number, name, description, image } = dataProcessService;
        if (!id || !step_number || !name || !description || !image ) {
            return ResponseError(res, 'Require params')
        }
        MidProcess.updateProcessService(dataProcessService)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    deleteProcessService = (req, res) => {
        let { id } = req.body
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidProcess.deleteProcessService(parseInt(id))
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }
}
export default new ProcessController()