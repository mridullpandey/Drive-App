const { DynamoHelper } = require("../dbHelper")
const { Log } = require("../../../logging/index")
const _ = require("lodash")
const TAG = __filename
// Dynamo Tables
const ARTIFACTS = "table1"
const RESOURCE_DETAILS = "table2"


const applyProjection = async (params, projection) => {
    try {
        params["ProjectionExpression"] = projection.join(",")
    } catch (err) {
        Log.error(TAG, "applyProjection", "Error applying projection", err)
    }
    return params
}

const applyFilter = async (params, filter) => {
    try {
        let FilterExpression = []
        let ExpressionAttributeValues = {}
        Object.keys(filter).forEach((key) => {
            FilterExpression.push(`${key} = :${key}`)
            ExpressionAttributeValues[`:${key}`] = filter[key]
        })
        params["FilterExpression"] = FilterExpression.join(" AND ")
        params["ExpressionAttributeValues"] = {
            ...params["ExpressionAttributeValues"],
            ...ExpressionAttributeValues
        }
    } catch (err) {
        Log.error(TAG, "applyFilter", "Error applying filter", err)
    }
    return params
}
