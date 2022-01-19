'use strict';

const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const {resolve} = require('path');
const swaggerDocument = yaml.load(resolve(__dirname, '../swagger.yaml'));
module.exports.swaggerDocument = swaggerDocument;
module.exports = [
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
];
