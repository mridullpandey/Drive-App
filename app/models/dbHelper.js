// Created by mridul on 05/01/2023 for dynamoDB

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb")
const {
    DynamoDBDocument,
    QueryCommand,
    ScanCommand,
    PutCommand,
    GetCommand,
    UpdateCommand,
    DeleteCommand
} = require("@aws-sdk/lib-dynamodb")
const { Log } = require("../../logging/index")
const { Utils } = require("../utils/index")

const TAG = __filename

class DynamoHelper {
    constructor() {
        const awsConfig = Utils.getAWSCredentials()
        this.settings = {
            region: awsConfig.AWS_REGION,
            credentials: {
                accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
                secretAccessKey: awsConfig.AWS_SECRET_ACCESS_KEY
            }
        }
        const marshallOptions = {
            convertClassInstanceToMap: true,
            removeUndefinedValues: true
        }
        this.client = DynamoDBDocument.from(
            new DynamoDBClient(this.settings),
            { marshallOptions }
        )
    }

    async queryOp(input) {
        try {
            let result
            let data = []
            do {
                result = await this.client.send(new QueryCommand(input))
                data.push(...result.Items)
                input.ExclusiveStartKey = result.LastEvaluatedKey
            } while (result.LastEvaluatedKey !== undefined)
            return data
        } catch (e) {
            Log.error(TAG,"queryOp", "Error querying", e)
        }
    }

    async scanOp(input) {
        try {
            let result
            let data = []
            do {
                result = await this.client.send(new ScanCommand(input))
                data.push(...result.Items)
                input.ExclusiveStartKey = result.LastEvaluatedKey
            } while (result.LastEvaluatedKey !== undefined)
            return data
        } catch (e) {
            Log.error(TAG, "scanOp", "Error scanning", e)
        }
    }

    async putItem(input) {
        try {
            await this.client.send(new PutCommand(input))
        } catch (e) {
            Log.error(TAG, "putItem", "Error putting item", e)
        }
    }

    async getItem(input) {
        try {
            const result = await this.client.send(new GetCommand(input))
            return result
        } catch (e) {
            Log.error(TAG, "getItem", "Error getting item", e)
        }
    }

    async updateItem(input) {
        try {
            await this.client.send(new UpdateCommand(input))
        } catch (e) {
            Log.error(TAG, "updateItem", "Error updating item", e)
        }
    }

    async deleteItem(input) {
        try {
            await this.client.send(new DeleteCommand(input))
        } catch (e) {
            Log.error(TAG, "deleteItem", "Error deleting item", e)
        }
    }

    async getLengthQuery(input) {
        try {

        } catch (e) {
            Log.error(TAG, "getLengthQuery", "Error getLengthQuery", e)
        }
    }
}

module.exports = {
    DynamoHelper
}