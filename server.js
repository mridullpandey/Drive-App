'use strict';
require("dotenv").config();

const { httpConstants } = require("./app/common/constants");

const app = require('express')();
const { Utils } = require('./app/utils/index.js');
const Sentry = require("./config/sentry")


global.webLog = Utils.webLog;
global.basedir = __dirname;


const PORT = process.env.PORT || 4090;
const http = require('http').Server(app);
global.io = require('socket.io')(http);
require('./config/express')(app);
app.use("/api/v1/driveApp", require("./routes"));

Promise.all([]
).then(listen).catch((err) => {
    webLog("Error", {}, "listen")
})


function listen() {
    try {
        app.listen(PORT);
        webLog('listen', `Server Started on port ${PORT}`, {}, "", '', httpConstants.LOG_LEVEL_TYPE.INFO);
    }
    catch (err) {
        console.log(err);
    }
}
