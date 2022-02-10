const Joi = require('@hapi/joi');
const CommonErrorMessage = require('../common/CommonErrorMessage');

/**
 * We doo some cool stuff here to avoid Express query parsing error with Joi Validator
 */

/**
 * GetMessageCollectionFilter Validator
 * @typedef {object} CommonFilter
 * @property {string} message_id - Message id.
 * @property {string} message - Message content.
 */
const GetMessageCollectionFilter = Joi.object({
    offset: Joi.string()
        .error(CommonErrorMessage.validate),
    limit: Joi.number().integer().max(10),
    sort: Joi.string().valid('_id'),
    order: Joi.string().valid('1', '-1'),
}).error(CommonErrorMessage.validate_global);

/**
 * GetMessageByIdFilter Validator
 * @typedef {object} CommonFilter
 * @property {string} message_id - Message id.
 * @property {string} message - Message content.
 */
const GetMessageByIdFilter = Joi.object({
    message_id: Joi.string().required()
        .error(CommonErrorMessage.validate),
}).error(CommonErrorMessage.validate_global);


module.exports = {
    GetMessageCollectionFilter,
    GetMessageByIdFilter
};
