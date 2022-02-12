const fs = require("fs");
const rfs = require("rotating-file-stream");
const morganLogger = require("morgan");

/**
 * Module Logger pour gérer les fichiers de logs et l'envoi vers APM Elastic.
 *
 * @exports Infrastructure/adapters/management/logs/Logger
 *
 * */
class Logger {
  /**
   * Constructor.
   * Initiation de log directory.
   *
   * @param {string} dirName - Dossier de log.
   * @example
   * const logger = new Logger('/testlog');
   */
  constructor(dirName) {
    this.dirName = dirName;
  }

  /**
   * Creation des fichiers de logs.
   *
   * @param {object} options - LogsFile et LogsFileError c'est les noms des fichiers pour les deux niveaux de logs.
   * @property {string} options.logsFile
   * @property {string} options.logsFileError
   */
  initDir(
    options = {
      logsFile: __config.variables.LOG_ACCESS_FILE || "access.log",
      logsFileError: __config.variables.LOG_ERROR_FILE || "error.log",
    }
  ) {
    if (!fs.existsSync(this.dirName)) fs.mkdirSync(this.dirName);

    // Custom Log format
    const accessLogFormat =
      ":correlationId :remote-addr - :remote-user [:date[web]] ':method :url HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent'";
    const errorLogFormat =
      ":correlationId :remote-addr - :remote-user [:date[web]] ':method :url :responseBody HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent'";

    // Creating custom token in morgan and setup end to end correlation
    morganLogger.token("correlationId", (req) => {
      return req.headers.correlationid;
    });
    morganLogger.token("responseBody", (req) => {
      if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method))
        return JSON.stringify(req.body);
      return JSON.stringify({ data: "NoN" });
    });
    const accessLogStream = rfs.createStream(options.logsFile, {
      size: "10M",
      interval: "1d", // rotate daily
      path: this.dirName,
      compress: true,
      maxSize: "5G",
      maxFiles: 15,
    });
    const errorLogStream = rfs.createStream(options.logsFileError, {
      size: "10M",
      interval: "1d", // rotate daily
      path: this.dirName,
      compress: true,
      maxSize: "2G",
      maxFiles: 15,
    });
    const errorAPMLogStream = rfs.createStream("apm-error.log", {
      size: "10M",
      interval: "1d", // rotate daily
      path: this.dirName,
      compress: true,
      maxSize: "10G",
      maxFiles: 30,
    });
    const errorAppInsightsLogStream = rfs.createStream("app-insights.log", {
      size: "10M",
      interval: "1d", // rotate daily
      path: this.dirName,
      compress: true,
      maxSize: "10G",
      maxFiles: 30,
    });
    return [
      morganLogger(accessLogFormat, {
        skip: (req, res) => {
          return res.statusCode >= 400;
        },
        stream: accessLogStream,
      }),
      morganLogger(errorLogFormat, {
        skip: (req, res) => {
          return res.statusCode < 400;
        },
        stream: errorLogStream,
      }),
    ];
  }
}

module.exports = Logger;
