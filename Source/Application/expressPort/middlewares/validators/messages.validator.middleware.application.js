const { messages } = require('./../../../dto');
/**
 * @typedef {MessagesInput} MessagesInput
 */

/**
 * Used to validate the input object based on the joi schema.
 *
 * @param {object} object - Object input to validate.
 * @param {object} joiSchema - Joi schema object model.
 * @returns {{valid: {boolean}, error: {Object}}}
 */
function validate_message_input_filter(object, joiSchema) {
    const { error } = joiSchema.validate(object);
    const valid = error != null ? false : Object.keys(object).length > 0;
    return { valid, error };
}

function query_parser(request) {
    parseInt(request.query.limit);
    parseInt(request.query.offset);
    return request;
}

/**
 * Middleware Validator GET_MESSAGES_COLLECTION_VALIDATOR.
 *
 * @function
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @param {Function} next - Callback Express.
 */
function get_messages_collection_validator (request, response, next) {
    try {
        const inputValidator = messages.GetMessageCollectionFilter;
        query_parser(request);
        const result = validate_message_input_filter(request.query, inputValidator);
        if (result.error) {
            request._type_content = 'bad_request_with_errors';
            request._details = result.error ? result.error.details.map(elm => elm.message) : [];
        }
    } catch (e) {
        request._type_content = 'internal_server_with_errors';
        request._details = [{ message: e.message }];
    } finally {
        next();
    }
}

/**
 * Middleware Validator GET_MESSAGES_BY_ID_VALIDATOR.
 *
 * @function
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @param {Function} next - Callback Express.
 */
function get_messages_by_id_validator (request, response, next) {
    try {
        const inputValidator = messages.GetMessageByIdFilter;
        const result = validate_message_input_filter(request.params, inputValidator);
        if (result.error) {
            request._type_content = 'bad_request_with_errors';
            request._details = result.error ? result.error.details.map(elm => elm.message) : [];
        }
    } catch (e) {
        request._type_content = 'internal_server_with_errors';
        request._details = [{ message: e.message }];
    } finally {
        next();
    }
}


module.exports = {
    get_messages_collection_validator,
    get_messages_by_id_validator,
}
