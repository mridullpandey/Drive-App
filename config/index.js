//created by Mridul on 05/01/2023

const path = require('path');
const extend = require('util')._extend;
const local = require('./env/local');
const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');
const staging = require('./env/staging');
const defaults = {
    root: path.normalize(__dirname + '/..')
};

/**
 * Expose
 */

module.exports = {
    development: extend(development, defaults),
    test: extend(test, defaults),
    production: extend(production, defaults),
    staging: extend(staging, defaults),
    local: extend(local, defaults)
}[process.env.NODE_ENV || 'development'];
