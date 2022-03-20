const { middleware, paths } = require("./../index");
const { ResponseController } = require(__moduleAliases.Infrastructure).http;

module.exports = [
  {
    route: (app) => {
      app
        .route(paths.get_welcome_messages.url)
        .get(
          middleware.validators.get_messages_collection_validator,
          middleware.controllers.get_messages_collection,
          ResponseController.ExpressResponseController
        );
    },
    envs: ["all"],
    versions: ["v1.0"],
  },
  {
    route: (app) => {
      app
        .route(paths.get_welcome_messages_by_id.url)
        .get(
          middleware.validators.get_messages_by_id_validator,
          middleware.controllers.get_messages_by_id,
          ResponseController.ExpressResponseController
        );
    },
    envs: ["all"],
    versions: ["v1.0"],
  },
];
