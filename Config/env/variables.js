/**
 * @param {object} env - Environment variables.
 *@property {string} NODE_ENV - Application launch mode (production ...).
 *@property {string} APP_PREFIX - Prefix URI: / api.
 *@property {string} APP_SERVER_HOST - The name or ip address of the host on which the API will be exposed.
 *@property {string} APP_SERVER_PORT - Port on which the API will be exposed.
 *@property {string} DATABASE_SERVER - SERVER on which the database will be hosted.
 *@property {string} LOG_ERROR_FILE - Name of your error log file : error.log [default].
 *@property {string} LOG_ACCESS_FILE - Name of your access log file : access.log [default].
 *@property {string} DEFAULT_LOG_DIR - log directory where log file will be hosted.
 *@property {string} SKIP_LOGGER - Enable or skip the log system.
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
  /** @type {string} */
  LOG_ERROR_FILE: process.env.LOG_ERROR_FILE,
  /** @type {string} */
  LOG_ACCESS_FILE: process.env.LOG_ACCESS_FILE,
  /** @type {string} */
  DEFAULT_LOG_DIR: process.env.DEFAULT_LOG_DIR,
  /** @type {string} */
  SKIP_LOGGER: process.env.SKIP_LOGGER,
};

module.exports = env;
