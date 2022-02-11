const { messages } = require(__moduleAliases.Domain).entities;
const Joi = require('@hapi/joi');

/**
 * We doo some cool stuff here to avoid Express query parsing error with Joi Validator
 */

const schemas = {
    GetMessageCollectionFilter: Joi.object().keys({
        offset: Joi.number().integer().min(1),
        limit: Joi.number().integer().max(10),
        sort: Joi.string().valid('_id'),
        order: Joi.number().valid(1, -1),
    }).error(messages.InputValidationCommonErrorMessage),

    GetMessageByIdFilter: Joi.object().keys({
        message_id: Joi.string().required(),
    }).error(messages.InputValidationCommonErrorMessage),
    // define all the other schemas below
};

module.exports = {
    schemas
};
