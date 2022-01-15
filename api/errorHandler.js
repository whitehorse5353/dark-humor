'use strict';

const {log} = require('./logger');

module.exports = {
    handle404: (request, response) => {
        response.sendStatus(404);
    },
    handleAll: (error, request, response, next) => {
        log.error(error);
        if (response.headersSent) {
            next(error);
        } else {
            response.sendStatus(500);
        }
    }
};
