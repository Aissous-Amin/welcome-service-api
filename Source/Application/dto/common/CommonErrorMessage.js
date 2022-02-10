/* eslint-disable no-param-reassign */
const {functionalMessage} = require(__moduleAliases.Domain);

class CommonErrorMessage {
    static validate(errors) {
        errors.forEach((err) => {
            switch (err.local.key) {
                case 'message_id':
                    err.message = {
                        message: functionalMessage.messages.MESSAGE_ID.MESSAGE,
                        id: functionalMessage.messages.MESSAGE_ID.ID,
                        type: functionalMessage.messages.MESSAGE_ID.TYPE,
                    };
                    break;
                case 'message':
                    err.message = {
                        message: functionalMessage.messages.MESSAGE.MESSAGE,
                        id: functionalMessage.messages.MESSAGE.ID,
                        type: functionalMessage.messages.MESSAGE.TYPE,
                    };
                    break;
                case undefined:
                    err.message = {
                        message: functionalMessage.common.UNDEFINED.MESSAGE,
                        id: functionalMessage.common.UNDEFINED.ID,
                        type: functionalMessage.common.UNDEFINED.TYPE,
                    };
                    break;
                default:
                    err.message = {
                        message: `${err.local.missing ? `Missing query : ${err.local.missing[0]}` : `Object unknown : forbidden extra query = ${err.local.key}`}`,
                        id: 'RV-0000',
                        type: functionalMessage.messages.MESSAGE.TYPE,
                    };
                    break;
            }
        });
        return errors;
    }

    static validate_global(errors) {
        errors.forEach((err) => {
            switch (err.code) {
                case 'number.base':
                    err.message = {
                        message: `${functionalMessage.messages.MESSAGE_ID.MESSAGE} : ${err.local.value}`,
                        id: functionalMessage.messages.MESSAGE_ID.ID,
                        type: functionalMessage.messages.MESSAGE_ID.TYPE,
                    };
                    break;
                case 'any.only':
                    err.message = {
                        message: `Les valeurs attendues pour le champs ${err.local.key} ne sont autorisées : ${err.local.value} ! les valeurs autorisées sont les suivant : ${err.local.valids}`,
                        id: functionalMessage.messages.MESSAGE_ID.ID,
                        type: functionalMessage.messages.MESSAGE_ID.TYPE,
                    };
                    break;
                case 'any.required':
                    err.message = {
                        message: `l'attribut ${err.local.key} est obligatoire`,
                        id: functionalMessage.messages.MESSAGE.ID,
                        type: functionalMessage.messages.MESSAGE.TYPE,
                    };
                    break;
                case 'object.unknown':
                    err.message = {
                        message: `${functionalMessage.common.OBJECT_UNKNOWN.MESSAGE} : ${err.local.key} = ${err.local.value}`,
                        id: functionalMessage.common.OBJECT_UNKNOWN.ID,
                        type: functionalMessage.common.OBJECT_UNKNOWN.TYPE,
                    };
                    break;
                case 'number.min':
                case 'number.max':
                    err.message = {
                        message: `Les valeurs attendues pour le champs ${err.local.key} ne sont autorisées : ${err.local.value}`,
                        id: functionalMessage.messages.MESSAGE_ID.ID,
                        type: functionalMessage.messages.MESSAGE_ID.TYPE,
                    };
                    break;
                default:
                    err.message = {
                        message: `Erreur de validation non identifiée`,
                        id: 'NNN.NNN.NNN.NNN',
                        type: functionalMessage.common.OBJECT_MISSING.TYPE,
                    };
                    break;
            }
        });
        return errors;
    }
}

module.exports = CommonErrorMessage;
