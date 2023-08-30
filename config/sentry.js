const Sentry = require("@sentry/node");
// Importing @sentry/tracing patches the global hub for tracing to work.
const config = require("./index");
Sentry.init({
    dsn: config.SENTRY_DSN,
    release: "1.2.3",
    // environment: "production",
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});
module.exports = Sentry; 