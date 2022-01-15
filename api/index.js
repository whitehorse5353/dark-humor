'use strict';

require('dotenv').config();
const {application, corsConfig} = require('./config');
const {join} = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const {handleAll, handle404} = require('./errorHandler');

app.use(express.static(join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.noCache());
app.use(cors(corsConfig));

require('./routes/registerRoutes')(app);

app.use(handle404);
app.use(handleAll);

app.listen(application.port, () =>
    console.log(`Listening on port http://${application.host}:${application.port}`));

module.exports = app;

