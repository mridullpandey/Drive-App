const { Log } = require("../logging/index");
const HttpService = require("../app/services/httpService");
const { Utils } = require("../app/utils/index");
const Config = require("../config/index");
const { httpConstants } = require("../app/common/constants");
const TAG = __filename;


const validateAuthToken = async (req, res, next) => {
    try {
        let authIdToken = req.headers['auth-id-token']
        let refreshToken = req.headers['refreshtoken']
        if (!authIdToken || !refreshToken) {
            Log.info(TAG, "validateAuthToken", "Token not found")
            return Utils.response(res, {}, "Token not found", false, 401)
        }

        // const url = `${Config.USER_SERVICE_URL}/users/validateToken`
        let [statusCode, response] = await HttpService.executeHttpRequest(
            url,
            httpConstants.METHOD_TYPE.POST,
            {
                "api-key": Config.apiKey,
            },
            { 
                ...req.headers,
            }
        )
        if (statusCode === 200) {
            req.email = response.responseData.email
            req.tenantId = response.responseData.tenantId
            req.role = response.responseData.role;
            req.authHeader = response.responseData.authHeader;
            req.userId = response.responseData.userId;
            req.employeeName = response.responseData.employeeName;
            req["auth-id-token"] = response.responseData['auth-id-token']
            res.setHeader("auth-id-token", response.responseData["auth-id-token"])
            res.setHeader("Access-Control-Expose-Headers", "auth-id-token")
            next()
        } else {
            Log.info(
                TAG,
                "validateAuthToken",
                `Authentication request failed: ${url} - ${statusCode} - ${response?.message[0]?.msg}`
            )
            return Utils.response(res, {}, "Unauthorized access", false, 401)
        }
    } catch (err) {
        Log.error(TAG, "validateAuthToken", "Error validating token", err)
        return Utils.response(res, {}, err, false, 401)
    }
}


const verifyApiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers['api-key'];
        let validApikey = (apiKey === Config.apiKey)
        if (!validApikey) {
            return Utils.response(res, {}, "Invalid api key", false, 401);
        }
        next()
    } catch (err) {
        Log.error(TAG, "verifyApiKey", "Failed to validate api key", err)
        return Utils.response(res, {}, err, false, 401);
    }
}

const parseQueryParams = async (req, res, next) => {
  try {
    const { tenantId, userEmail } = req.query;
    if(!tenantId) {
        Utils.response(res, {}, "tenantId is required", false, 401);
    }
    req.email = userEmail;
    req.tenantId = tenantId;
    next();
  } catch (err) {
    console.log(err);
    Utils.response(res, {}, err, false, 401);
  }
};

module.exports = {
    validateAuthToken: validateAuthToken,
    verifyApiKey: verifyApiKey,
    parseQueryParams: parseQueryParams
}