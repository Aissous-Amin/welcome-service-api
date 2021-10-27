const MESSAGE_TYPE = require('./typeMessage');
/**
 * Functional messages related to the Messages resource.
 */

/**
 *
 * @type {object} List of functional messages linked to the Messages resource.
 */
module.exports = {
    MESSAGE_ID: {
        MESSAGE: 'Les valeurs attendues pour le champs MESSAGES_ID ne sont pas au bon format',
        ID: 'RV-0001',
        TYPE: MESSAGE_TYPE.VALIDATION,
    },
    MESSAGE: {
        MESSAGE: 'Les valeurs attendues pour le champs MESSAGE ne sont pas au bon format',
        ID: 'RV-0002',
        TYPE: MESSAGE_TYPE.VALIDATION,
    },
};
