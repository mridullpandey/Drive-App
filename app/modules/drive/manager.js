const { Utils } = require('../../utils/index');
const { Log } = require("../../../logging/index");
const _ = require(`lodash`)
const HttpService = require("../../services/httpService")
const {
    httpConstants
} = require("../../common/constants")
const config = require("../../../config/index");
const TAG = __filename;


exports.BLManager = class BLManager {
    getfile = async (request) => {
        try {
            //get file from the google drive 
        } catch (error) {
            Log.error(TAG, "getfile", `Error while fetching files from the drive.`, error)
            return []
        }
    }
}