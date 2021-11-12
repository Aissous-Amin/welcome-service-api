const { middleware, paths } = require('./../index');

const { ResponseController } = require(__moduleAliases.Infrastructure).http;

module.exports = [
    {
        route: (app) => {
            app.route(paths.get_welcome_messages.url)
                .get(
                    middleware.validators.get_messages_welcome,
                    middleware.controllers.get_messages_welcome,
                    ResponseController.ExpressResponseController,
                );
        },
        envs: ['all'],
    },
];
