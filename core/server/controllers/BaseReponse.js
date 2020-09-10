'use stric';

module.exports = {
    ResponseSuccess: (res, data) => {
        res.send({
            signal: 1,
            message: 'SUCCESS',
            data: data
        });
    },

    ResponseError: (res, message = 'Something went wrong!') => {
        return res.send({
            signal: 0,
            message: (message.message) ? message.message : message
        });
    }
}
    
