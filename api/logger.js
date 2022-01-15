'use strict';

const {createLogger, format, transports} = require('winston');
const {logLevel} = require('./config');

module.exports = {
    log: createLogger({
        level: logLevel,
        format: format.combine(
            format.timestamp(),
            format.simple()
        ),
        transports: [
            new transports.Console()
        ]
    })
};
