const { BLManager } = require('./manager');
const { Utils } = require('../../utils/index');
const { Log } = require("../../../logging/index");
const TAG = __filename;
    //TODO: handle state parameter

module.exports = {
    driveLoginUrl: async (request, response) => {
        Log.info(TAG, "driveLoginUrl", "", request.params)
        let [error, data] = await Utils.parseResponse(new BLManager().driveLoginUrl(request?.params))
        if (error) {
            Log.error(TAG, "driveLoginUrl", "", error)
            return Utils.handleError(error, request, response)
        }
        response.redirect(data)
        // return Utils.response(response, data, 'driveLoginUrl', true, 200)
    },
    getfile: async (request, response) => {
        Log.info(TAG, "getfile", "", request.body)
        let [error, data] = await Utils.parseResponse(new BLManager().getfile(request, response))
        if (error) {
            Log.error(TAG, "getfile", "", error)
            return Utils.handleError(error, request, response)
        }
        return Utils.response(response, data, 'getfile', true, 200)
    },
    driveCallbackUrl: async (request, response) => {
        Log.info(TAG, "driveCallbackUrl", "", request.query)
        let [error, data] = await Utils.parseResponse(new BLManager().driveCallbackUrl(request?.query))
        if (error) {
            Log.error(TAG, "driveCallbackUrl", "", error)
            return Utils.handleError(error, request, response)
        }        
        response.redirect('https://drive.google.com/drive/')
        // return Utils.response(response, data, 'driveCallbackUrl', true, 200)
    },
    // registerApp: async (request, response) => {
    //     Log.info(TAG, "registerApp", "", request.body)
    //     let [error, data] = await Utils.parseResponse(new BLManager().registerApp(request?.body))
    //     if (error) {
    //         Log.error(TAG, "registerApp", "", error)
    //         return Utils.handleError(error, request, response)
    //     }
    //     return Utils.response(response, data, 'registerApp', true, 200)
    // },
}