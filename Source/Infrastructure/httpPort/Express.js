/**
 * Module dependencies.
 */
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const toobusy = require("toobusy-js");
const helmet = require("helmet");
const compression = require("compression");
const { Authorization } = require("../authenticationPort");

/**
 * Express module to launch web servers based on the expressJs framework.
 *
 * @version 4.16.0
 *
 * @exports Infrastructure/Express
 *
 * */

class Express {
  static initHelmetHeaders(app) {
    const SIX_MONTHS = 15778476000;
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(
      helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubDomains: true,
        force: true,
      })
    );
    if (["development"].includes(process.env.NODE_ENV)) {
      app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, Accept," +
            "X-Requested-With," +
            " Accept-Version, " +
            "Content-Length, " +
            "Content-MD5, " +
            "Content-Type, " +
            "Date, Api-Version, " +
            "X-Response-Time, " +
            "X-PINGOTHER, X-CSRF-Token,Authorization"
        );
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader(
          "Access-Control-Expose-Headers",
          "X-Api-Version, X-Request-Id, X-Response-Time"
        );
        res.setHeader("Access-Control-Max-Age", "1000");

        return next();
      });
    }

    app.disable("x-powered-by");
  }

  /**
   * Initializing the ExpressJs application.
   *
   * @returns {express} - Returns the ExpressJs instance.
   */
  static init(logger) {
    const app = express();
    // Set maximum lag to an aggressive value.
    toobusy.maxLag(10000);
    // Set check interval to a faster value. This will catch more latency spikes
    // but may cause the check to be too sensitive.
    toobusy.interval(250);
    app.set("showStackError", true);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    /** Enable log file rotation with morgan */
    if (["production", "development"].includes(__config.variables.NODE_ENV))
      app.use(logger);
    /** Enable authorization system with passport and MSAL microsoft AAD */
    if (["production"].includes(__config.variables.NODE_ENV)) {
      const authorization = new Authorization(passport, app);
      app.use(authorization.setup());
    }
    /** Add Api-Version to All Header Response. */
    app.use((request, response, next) => {
      response.setHeader(
        "Api-Version",
        __config.API_VERSION ? __config.API_VERSION : "NoN"
      );
      next();
    });
    app.use((request, response, next) => {
      response.setHeader(
        "correlationId",
        request.headers.correlationid
          ? request.headers.correlationid
          : "0000-0000-0000-0000-0000"
      );
      next();
    });
    this.initHelmetHeaders(app);
    return app;
  }
}

module.exports = Express;
