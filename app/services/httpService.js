const request = require("requestretry");

class HttpService {
    static async executeHttpRequestForm(url, method, data, headers, form_data) {
        return await new Promise(function (fulfill, reject) {
            request({
                url: url,
                method: method,
                headers: headers,
                formData: form_data,
                maxAttempts: 3,
                retryDelay: 1000,
                retryStrategy: request.RetryStrategies.HTTPOrNetworkError
            }, function (error, response, body) {
                if (error) {
                    reject(error)
                } else {
                    let data = [response.statusCode, body]
                    fulfill(data)
                }
            })
        })
    }

    static async executeHttpRequest(url, method, headers, payload = {}, json = true) {
        return await new Promise(function (fulfill, reject) {
            request({
                url: url,
                method: method,
                headers: headers,
                json: json,
                body: payload
            }, function (error, response, body) {
                if (error) {
                    reject(error)
                } else {
                    let data = [response.statusCode, body]
                    fulfill(data)
                }
            })
        })
    }
}

module.exports = HttpService;