const {log} = require('../logger');
const healthCheck = require('./healthCheck');
const products = require('./products');
const basket = require('./basket');
module.exports = (app) => {
    log.info('Application routes registration started.');

    app.use('/health-check', healthCheck);
    app.use('/', products);
    app.use('/', basket);

    log.info('Application routes registered successfully.');
};
