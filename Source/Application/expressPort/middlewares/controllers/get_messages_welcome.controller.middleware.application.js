const common_use_case = require('../../uses-cases');
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
async function get_messages_welcome(request, response, next) {
    try {
        if (request._type_content === undefined) {
            const result = await common_use_case.queries.read_welcome_messages_collection(request.query);
            if(result.length) {
                request._resource = {
                    message: result.map(res => res.message) ,
                    UserAgent: request.headers['user-agent'],
                };
                request._resource_type = 'Welcome_Messages_Collection_Resource';
                request._type_content = 'object';
            } else {
                request._type_content = 'not_found_with_errors';
                request._details = [{ message: `Le message avec l'id = ${request.query.message_id} n'existe pas!`}];
            }
        }
    } catch (e) {
        console.error(e.message);
        request._type_content = 'internet_server_with_errors';
        request._details = [{message: e.message}];
    } finally {
        next();
    }
}

module.exports = get_messages_welcome;
