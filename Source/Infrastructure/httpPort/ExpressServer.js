const Express = require("./Express");
const https = require("https");
const fs = require("fs");
const { Logger, Winston } = require("../managementAdapters");
const { Mongoose } = require(__moduleAliases.Persistance);
const path = require("path");

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

  static shutDown() {
    console.log("Received kill signal, shutting down gracefully");
    server.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0);
    });

    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, 10000);
  }

  static https_listen(app) {
    const options = {
      key: fs.readFileSync(path.join(process.cwd(), process.env.KEY)),
      cert: fs.readFileSync(path.join(process.cwd(), process.env.CERT)),
    };
    https.globalAgent.maxSockets = Infinity;
    server = https.createServer(options, app);
    server.listen(__config.APP_SERVER_PORT);
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
    await this.https_listen(app);
    Winston.info(__config.startMessage);
    Winston.info(`${__config.app.title} VERSION ${__config.API_VERSION}`);
    Winston.info(`Environnement: ${process.env.NODE_ENV}`);
    Winston.info(
      `Server listen : https://${__config.APP_SERVER_HOST}:${__config.APP_SERVER_PORT}${__config.APP_PREFIX}`
    );
    // Health Checks and Graceful Shutdown
    app.on("SIGTERM", () => {
      console.debug("SIGTERM signal received: closing HTTP server");
      this.close();
    });
    return app;
  }

  /**
   * Stoper l'application.
   */
  static close() {
    server.close(() => console.debug("HTTP server closed"));
  }
}

/**
 * Module Web du service.
 *
 * @exports Infrastructure/http/ExpressServer
 * */
module.exports = ExpressServer;
