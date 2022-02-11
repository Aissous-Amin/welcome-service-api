const { messagesInputFilter } = require('./../../../dto');
const { creat_response_structure, validate_input_object } = require(__moduleAliases.Utils).functionality;

/**
 * @typedef { MessagesInput } MessagesInput
 */

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
        const inputValidator = messagesInputFilter.schemas.GetMessageCollectionFilter;
        const result = validate_input_object(request.query, inputValidator);
        if (!result.valid) {
            creat_response_structure(request, result.validation_errors, '', 'bad_request_with_errors', true);
        }
    } catch (error) {
        creat_response_structure(request, error.message, '', 'internal_server_with_errors', true);
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
        const inputValidator = messagesInputFilter.schemas.GetMessageByIdFilter;
        const result = validate_input_object(request.params, inputValidator);
        if (!result.valid) {
            creat_response_structure(request, result.validation_errors, '', 'bad_request_with_errors', true);
        }
    } catch (error) {
        creat_response_structure(request, error.message, '', 'internal_server_with_errors', true);
    } finally {
        next();
    }
}


module.exports = {
    get_messages_collection_validator,
    get_messages_by_id_validator,
}
