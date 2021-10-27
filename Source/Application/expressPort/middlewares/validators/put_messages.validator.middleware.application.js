const { messages } = require('./../../../dto');
/**
 * @typedef {ConcertsInput} ConcertsInput
 */

/**
 * Used to validate the input elements.
 *
 * @param {object} query - Object of query filter input.
 * @returns {{valid: {boolean}, error: {Object}}}
 */
function validate_input_filter(query) {
    const inputValidator = messages.MessageInputFilter;
    const { error } = inputValidator.validate(query);
    const valid = error != null ? false : Object.keys(query).length > 0;
    return { valid, error };
}

/**
 * Middleware Validator GET_CONCERTS_VALIDATOR.
 *
 * @function
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @param {Function} next - Callback Express.
 */
module.exports = (request, response, next) => {
    try {
        /** Split bandIds query to an array of id. */
        // eslint-disable-next-line no-unused-expressions
        request.query.message_id ? request.query.message_id = request.query.bandIds.trim().split(',') : null;
        const result = validate_input_filter(request.query);
        if (!result.valid) {
            request._type_content = 'bad_request_with_errors';
            request._details = result.error ? result.error.details.map(elm => elm.message) : [];
        }
    } catch (e) {
        request._type_content = 'internal_server_with_errors';
        request._details = [{ message: e.message }];
    } finally {
        next();
    }
};
