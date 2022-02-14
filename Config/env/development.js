const variables = require("./variables");
// You can add extra env var dev here ! Example :
// variables.extra_var_dev = 'test dev';

variables.authConfig = {
  credentials: {
    tenantID: process.env.tenantID,
    clientID: process.env.clientID,
  },
  metadata: {
    authority: "login.microsoftonline.com",
    discovery: ".well-known/openid-configuration",
    version: "v2.0",
  },
  settings: {
    validateIssuer: true,
    passReqToCallback: false,
    loggingLevel: "info",
  },
  protectedRoutes: {
    messages: {
      endpoint: "/messages",
      scopes: ["access_as_super_user", "access_as_user"],
    },
  },
  roles: {
    ADMIN: "Admin",
    BASIC: "User",
  },
  failureRedirect: "",
};

module.exports = {
  variables,
};
