/**
 * @param {object} env - Environment variables.
 *@property {string} NODE_ENV - Application launch mode (production ...).
 *@property {string} APP_PREFIX - Prefix URI: / apiwemaintain.
 *@property {string} APP_SERVER_HOST - The name or ip address of the host on which the API will be exposed.
 *@property {string} APP_SERVER_PORT - Port on which the API will be exposed.
 */

const env = {
    /** @type {string} */
    NODE_ENV: process.env.NODE_ENV || 'development',
    /** @type {string} */
    APP_PREFIX: process.env.APP_PREFIX || '/api',
    /** @type {string} */
    APP_SERVER_HOST: process.env.APP_SERVER_HOST,
    /** @type {string} */
    APP_SERVER_PORT: process.env.APP_SERVER_PORT,
    /** @type {string} */
    DATABASE_SERVER: process.env.DATABASE_SERVER || 'mongodb://localhost:27017/messages',
};

module.exports = env;
