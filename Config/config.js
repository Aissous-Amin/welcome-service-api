const path = require("path");
/**
 *
 * @type {object} Parametrages par defaut de l'application (valable pour tout environnement).
 */
const defaultConfig = require(path.join(
  process.cwd(),
  "/Config/env/default.js"
));

const env = require("./env/variables");
const pkg = require("../package.json");

/**
 *
 * @type {object} Parametrages par environnement.
 */
const environmentConfig = require(path.join(
  process.cwd(),
  "/Config/env",
  `${env.NODE_ENV ?? "development"}.js`
));

/**
 * Validate NODE_ENV existence.
 */

const EnvironmentVariable = () => {
  const environmentFiles = path.join("./env/", `${env.NODE_ENV}.js`);
  if (!environmentFiles.length) {
    if (env.NODE_ENV) {
      console.error(
        `+ Error: No configuration file found for "${env.NODE_ENV}" environment using development instead`
      );
    } else {
      console.error(
        "+ Error: NODE_ENV is not defined! Using default development environment"
      );
    }
    env.NODE_ENV = "development";
  }
};

/**
 * Validate domain env configuration.
 * You can add more check here !
 * @param {object} config - Objet config.
 */
const DomainCheck = (config) => {
  if (!config.prefix) {
    throw new Error(
      "+ Important warning: config.prefix is empty. It should be set to the fully qualified prefix of the app."
    );
  }
  if (!config.variables.NODE_ENV) {
    throw new Error(
      "+ Important warning: config.variables.NODE_ENV is empty. It should be set to the fully qualified environment of the app."
    );
  }
  if (!config.API_VERSION) {
    throw new Error(
      "+ Important warning: config.API_VERSION is empty. It should be set to the fully qualified environment of the app."
    );
  }
};

/**
 * Initialize global configuration.
 *
 * @returns {object} - Objet config commun à l'application.
 */
const initGlobalConfig = () => {
  EnvironmentVariable();
  const config = Object.assign(defaultConfig, environmentConfig ?? {}, {
    API_VERSION: pkg.version ?? "NoN",
  });
  DomainCheck(config);
  return config;
};

/**
 * Set configuration object.
 */
global.__config = initGlobalConfig();
