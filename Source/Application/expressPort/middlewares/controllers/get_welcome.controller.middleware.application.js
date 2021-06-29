/**
 * @typedef {WelcomeSchema} WelcomeSchema
 */

/**
 * MiddlewareController GET_WELCOME.
 *
 * @module Welcome
 * @function
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @param {Function} next - Callback next express.
 */
async function get_welcome(request, response, next) {
    try {
        request._resource = {
            message: "Welcome To Welcome Service API version 2020",
            UserAgent: request.headers['user-agent'],
        };
        request._type_content = 'object';
    } catch (e) {
        console.error(e.message);
        request._type_content = 'internet_server_with_errors';
        request._details = [{ message: e.message }];
    } finally {
        next();
    }
}

module.exports = get_welcome;
