const variables = require('./variables');
const path = require('path');

global.__base = process.cwd();
global.__baseSrouce = `${__base}/Source`;

/**
 * The __moduleAliases can be used to access different project directories.
 *
 * @type {{root: string, Persistance: *, Application: *, Infrastructure: *, Domain: *, Presentation: *, Utils: *, Config: *}}
 * @private
 */
__moduleAliases = {
    root: '.', // Application's root
    Persistance: path.join(__baseSrouce, 'Persistance'),
    Application: path.join(__baseSrouce, 'Application'),
    Infrastructure: path.join(__baseSrouce, 'Infrastructure'),
    Domain: path.join(__baseSrouce, 'Domain'),
    Presentation: path.join(__baseSrouce, 'Presentation'),
    Utils: path.join(__baseSrouce, 'Utils'),
    Config: path.join(__base, 'Config'),
};

Object.assign(global, __moduleAliases);

/**
 *
 * @type {{prefix: (string|string), port: (string|string), host: (string|string)}}
 */
module.exports = {
    prefix: variables.APP_PREFIX || '/apiwelcomeservice',
    port: variables.APP_SERVER_PORT || process.env.PORT || '3001',
    host: variables.APP_SERVER_HOST || process.env.HOST || 'localhost',
    startMessage: `˜”*°•.˜”*°• Weclome to API Service*”˜.•°*”˜`,
    app: {

        title: 'WELCOME-API-SERVICE ',
        description: 'Welcome API service est un POC d initiation aux principles bonne pratiques d implimentation d une API RESTfull',
        keywords: 'backend, test, concerts, express, node.js',
    },
};
