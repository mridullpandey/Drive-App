//Created by Mridul on 05/01/2023.

const MORGAN = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
module.exports = function (app) {

    //For print APIs Logs
    app.use(MORGAN(':method :url :response-time'));
    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    // parse application/json
    app.use(express.json({ limit: '50mb', extended: true }));
    // app.use(helmet());
    app.use(cors());
    app.use(compression(9));
    app.set('etag', false);
    app.use(helmet())

};