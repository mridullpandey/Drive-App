module.exports = {
    DB: process.env.DB || '',
    IS_CONSOLE_LOG: "true",
    ENV: process.env.ENV || "-dev",
    region: process.env.region || "",
    dynamoDBEndpoint: process.env.dynamoDBEndpoint || "",
    s3Endpoint: process.env.s3Endpoint || "",

    SENTRY_DSN: process.env.SENTRY_DSN || ""
};