const BearerStrategy = require("passport-azure-ad").BearerStrategy;

const options = {
  identityMetadata: `https://${__config.variables.authConfig.metadata.authority}/${__config.variables.authConfig.credentials.tenantID}/${__config.variables.authConfig.metadata.version}/${__config.variables.authConfig.metadata.discovery}`,
  issuer: `https://${__config.variables.authConfig.metadata.authority}/${__config.variables.authConfig.credentials.tenantID}/${__config.variables.authConfig.metadata.version}`,
  clientID: __config.variables.authConfig.credentials.clientID,
  audience: __config.variables.authConfig.credentials.clientID, // audience of this application
  validateIssuer: __config.variables.authConfig.settings.validateIssuer,
  passReqToCallback: __config.variables.authConfig.settings.passReqToCallback,
  loggingLevel: __config.variables.authConfig.settings.loggingLevel, //Logging level. 'info', 'warn' or 'error'.
  scope: [...__config.variables.authConfig.protectedRoutes.messages.scopes],
  authority: `https://${__config.variables.authConfig.metadata.authority}/${__config.variables.authConfig.credentials.tenantID}`,
};

class Authorization {
  constructor(passport, router) {
    router.use(passport.initialize());
    const bearerStrategy = new BearerStrategy(options, (token, done) => {
      // Send user info using the second argument
      done(null, {}, token);
    });
    passport.use(bearerStrategy);
    this.passportAuth = passport.authenticate("oauth-bearer", {
      failureRedirect: __config.variables?.authConfig?.failureRedirect ?? "", // Replace with an endpoint which can be used to display an error page or JSON error message
      session: false,
    });
  }

  setup() {
    return this.passportAuth;
  }
}

module.exports = Authorization;
