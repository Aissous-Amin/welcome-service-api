const Express = require('./Express');
const http = require('http');
const persistence = require(__moduleAliases.Persistance);

// const { Messages } = persistence.mongoose.schemas.messages;

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
        /** init connection with Mongoose data base. */
        await persistence.mongoose.database.init();
        /** Implement data into our Mongoose data base. */
        //await persistence.mongoose.database.import_data({Messages});
        /** @type {object} */
        const app = Express.init();
        /** init connection with APM agent. */
        // persistence.elasticApm.elasticApmConfig.init();
        /** Create log directory with logger stream. */
        // logger.initDir();
        /** init connection with azure application insights. */
        // persistence.appInsight.applicationInsightConfig.init(__config.AZURE_APPLICATION_INSIGHTS);
        /** TODO : Create log directory with logger stream or apm agent here. */
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
        console.log(`${__config.app.title} VERSION ${global.api_version}`);
        console.log(`Environnement: ${process.env.NODE_ENV || 'test'} `);
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
