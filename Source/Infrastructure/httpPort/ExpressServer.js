const Express = require("./Express");
const http = require("http");
const Logger = require("../managementAdapters/Logger");
const { Mongoose } = require(__moduleAliases.Persistance);

/** @memberof Infrastructure/ports/http */

/**
 *{http.ExpressServer} Web Server.
 */
let server;

class ExpressServer {
  /**
   * Fonction d'initialisation du serveur API.
   *
   * @returns {*|void|Promise<void>}
   * @param {*} middlewares - Middlewares Express.
   */
  static async init(middlewares) {
    /** Init log directory with logger stream morgan. */
    const logger = new Logger(__config.variables.DEFAULT_LOG_DIR);
    /** init connection with Mongoose database. */
    const mongoose = new Mongoose.database(__config.variables.DATABASE_SERVER);
    await mongoose.init();
    /** Init data into our Mongoose database. */
    // await mongoose.import_data({ Messages: Mongoose.schemas.message });
    const app = Express.init(logger.initDir());
    /** init connection with APM agent. */
    // ElasticApm.elasticApmConfig.init();
    /** init connection with azure application insights. */
    // AppInsight.applicationInsightConfig.init(__config.variables.AZURE_APPLICATION_INSIGHTS);
    /** Init service end-points. */
    middlewares(app);
    return app;
  }

  static http_listen(app) {
    http.globalAgent.maxSockets = Infinity;
    server = http.createServer(app);
    server.listen(__config.port);
    return server;
  }

  /**
   * Fonction de lancement d'application.
   *
   * @param {Function} middlewares - La liste des middlewares exposés par l'application.
   *
   * @returns {Promise<void>} Retourne une promise.
   */
  static async start(middlewares) {
    const app = await ExpressServer.init(middlewares);
    await this.http_listen(app);
    console.log(__config.startMessage);
    console.log(`${__config.app.title} VERSION ${__config.API_VERSION}`);
    console.log(`Environnement: ${process.env.NODE_ENV}`);
    return app;
  }

  /**
   * Stoper l'application.
   */
  static close() {
    server.close();
  }
}

/**
 * Module Web du service.
 *
 * @exports Infrastructure/http/ExpressServer
 * */
module.exports = ExpressServer;
