/**
 * @param {object} env - Environment variables.
 *@property {string} NODE_ENV - Application launch mode (production ...).
 *@property {string} APP_PREFIX - Prefix URI: / api.
 *@property {string} APP_SERVER_HOST - The name or ip address of the host on which the API will be exposed.
 *@property {string} APP_SERVER_PORT - Port on which the API will be exposed.
 *@property {string} DATABASE_SERVER - SERVER on which the database will be hosted.
 */

const env = {
    /** @type {string} */
    NODE_ENV: process.env.NODE_ENV,
    /** @type {string} */
    APP_PREFIX: process.env.APP_PREFIX,
    /** @type {string} */
    APP_SERVER_HOST: process.env.APP_SERVER_HOST,
    /** @type {string} */
    APP_SERVER_PORT: process.env.APP_SERVER_PORT,
    /** @type {string} */
    DATABASE_SERVER: process.env.DATABASE_SERVER,
};

module.exports = env;
