const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

/**
 * @module MONGOOSE
 *
 * MONGOOSE module to connect with the Mongodb database.
 *
 * @exports Persistance/adapters/MONGOOSE
 * */
class MONGOOSE {
  /**
   * Constructor.
   * Initiation de la connexion with database.
   *
   * @param {string} server - database server.
   * @param {string} user - database credential.
   * @param {string} password - database credential.
   * @example
   * const database = new MONGOOSE('server', 'user', 'password');
   */
  constructor(server, user, password) {
    this.server = server;
    this.user = user;
    this.password = password;
    this.pool = null;
  }
  /**
   * Init Mongoose Function.
   *
   * @param parameters
   * @param {object} parameters.
   * @property {string} parameters.server - Database machine (env var : DATABASE_SERVER).
   * @property {string} parameters.user - Database user (en var :DATABASE_USER).
   * @property {string} parameters.password - Database password (env var :DATABASE_PASSWORD).
   * @returns {Promise<void>}
   */
  async init(
    parameters = {
      server: this.server,
      user: this.user ?? "",
      password: this.password ?? "",
    }
  ) {
    try {
      const extendedParameters = Object.assign({}, parameters, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        poolSize: 10,
      });
      /** Set up default mongoose connection. */
      await mongoose.connect(extendedParameters.server, extendedParameters);
      this.pool = mongoose.connection;
      this.pool.on(
        "error",
        console.error.bind(console, "MongoDB connection error:")
      );
    } catch (e) {
      /** Bind connection to error event (to get notification of connection errors). */
      console.error(
        `database module can't not connect to  ${parameters.server}`
      );
      throw e;
    }
  }

  /**
   * Close connexion with database.
   *
   * @example
   * DB2.close();
   */
  static async close() {
    try {
      console.debug("Disconnecting mongoose from MongoDB database...");
      await mongoose.disconnect();
      console.debug("Mongoose disconnected from MongoDB database");
    } catch (err) {
      console.error(
        err,
        "An error occured while disconneting mongoose from the MongoDB database"
      );
      throw err;
    }
  }

  async import_data(data) {
    try {
      const promises = [];
      const messages = JSON.parse(
        fs.readFileSync(
          `${path.join(process.cwd(), "/Config/lib/data/messages.json")}`,
          "utf-8"
        )
      );
      promises.push(data.Messages.insertMany(messages));
      console.log("Importing data to mongodb database...");
      await Promise.all(promises);
      console.log("Import data to mongodb database : Done!");
    } catch (e) {
      console.error(e.message);
      process.exit();
    }
  }
}

module.exports = MONGOOSE;
