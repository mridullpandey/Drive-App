const Sentry = require("../config/sentry");
const path = require("path")

class CustomLogger {
    static info(TAG, method, message, payload={}) {
        console.info(`[INFO] ${path.basename(TAG)} - ${method} - ${message} - ${JSON.stringify(payload)}`)
    }

    static debug(TAG, method, message, payload={}) {
        console.debug(`[DEBUG] ${path.basename(TAG)} - ${method} - ${message}  - ${JSON.stringify(payload)}`)
    }

    static error(TAG, method, message, exception) {
        console.error(`[ERROR] ${path.basename(TAG)} - ${method} - ${message} - ${exception.message}`)
        Sentry.captureException(exception)
    }
}

module.exports = {
    Log: CustomLogger
}