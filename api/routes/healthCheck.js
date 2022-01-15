'use strict';

const express = require('express');
const healthCheck = new express.Router();
const {name, version} = require('../../package');

healthCheck.get('/', (request, response) =>
    response.json({
        application_name: name,
        version: version
    }));

module.exports = healthCheck;
