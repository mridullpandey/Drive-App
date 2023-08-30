const { BLManager } = require('./manager');
const { Utils } = require('../../utils/index');
const { Log } = require("../../../logging/index");
const TAG = __filename;

module.exports = {
    getfile: async (request, response) => {
        Log.info(TAG, "getfile", "", request.body)
        let [error, data] = await Utils.parseResponse(new BLManager().getfile(request?.body))
        if (error) {
            Log.error(TAG, "getfile", "", error)
            return Utils.handleError(error, request, response)
        }
        return Utils.response(response, data, 'getfile', true, 200)
    }
    
}