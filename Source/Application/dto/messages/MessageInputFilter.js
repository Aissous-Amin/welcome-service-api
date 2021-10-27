const Joi = require('@hapi/joi');
const CommonErrorMessage = require('../common/CommonErrorMessage');

/**
 * @typedef {object} CommonFilter
 * @property {Array} bandIds - Array of string (or comma separated list).
 * @property {number} latitude - Latitude.
 * @property {number} longitude - Longitude.
 * @property {number} radius - Radius in kilometers.
 */
const MessageInputFilter = Joi.object({
    message_id: Joi.array().required()
        .error(CommonErrorMessage.validate),
    message: Joi.string()
        .error(CommonErrorMessage.validate),
}).error(CommonErrorMessage.validate_global);

module.exports = MessageInputFilter;
