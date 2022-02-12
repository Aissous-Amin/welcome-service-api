const path = require("path");

if (process.env.NODE_ENV !== "production") {
  const dir = path.join(process.cwd(), "/Config/env/.env");
  require("dotenv").config({ path: dir });
}

const variables = require("./variables");

// require('dotenv').config()
global.__base = process.cwd();
global.__baseSrouce = `${__base}/Source`;

/**
 * The __moduleAliases can be used to access different project directories.
 *
 * @type {{root: string, Persistance: *, Application: *, Infrastructure: *, Domain: *, Presentation: *, Utils: *, Config: *}}
 * @private
 */
__moduleAliases = {
  root: ".", // Application's root
  Persistance: path.join(__baseSrouce, "Persistance"),
  Application: path.join(__baseSrouce, "Application"),
  Infrastructure: path.join(__baseSrouce, "Infrastructure"),
  Domain: path.join(__baseSrouce, "Domain"),
  Presentation: path.join(__baseSrouce, "Presentation"),
  Utils: path.join(__baseSrouce, "Utils"),
  Config: path.join(__base, "Config"),
};

Object.assign(global, __moduleAliases);

/**
 *
 * @type {{prefix: (string|string), port: (string|string), host: (string|string)}}
 */
module.exports = {
  prefix: variables.APP_PREFIX,
  port: variables.APP_SERVER_PORT,
  host: variables.APP_SERVER_HOST,
  startMessage: `˜”*°•.˜”*°• Weclome to API-Starter-Hexagonal-Kit Service*”˜.•°*”˜`,
  app: {
    title: "Starter-Hexagonal-Kit-Service ",
    description:
      "Starter-Hexagonal-Kit-Service est un starter kit qui vous aident à démarrer votre projet sur des bonnes bases",
    keywords:
      "API, RESful, backend, hexagonal, cleanCode, cleanArchitecture, DDD, test, messages, express, node.js, morgan, husky, pre-commit, pre-push, eslint, sonar, docker",
  },
};
