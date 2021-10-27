const { middleware, paths } = require('./../index');

const { ResponseController } = require(__moduleAliases.Infrastructure).http;

module.exports = [
    {
        route: (app) => {
            app.route(paths.get_welcome.url)
                .get(
                    middleware.validators.get_messages,
                    middleware.controllers.get_welcome,
                    ResponseController.ExpressResponseController,
                );
        },
        envs: ['all'],
    },
];
