const use_case = require('../../uses-cases');

/**
 * @typedef {WelcomeSchema} WelcomeSchema
 */

/**
 * creat_message_response_structure Response Controller System For message resource endpoint.
 * This function allows to build the message object
 * @module Message
 * @param request
 * @param resource
 * @param resource_type
 * @param type_content
 * @param error
 * @returns {*}
 */
function creat_message_response_structure(request, resource, resource_type, type_content, error = false) {
    if (!error) {
        request._resource = {
            message: resource,
            UserAgent: request.headers['user-agent'],
        };
    } else {
        request._details = [{message: resource}];
        console.error(resource);
    }
    request._resource_type = resource_type;
    request._type_content = type_content;
    return request;
}

/**
 * MiddlewareController GET_MESSAGE_COLLECTION.
 *
 * @module Message
 * @function
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @param {Function} next - Callback next express.
 */
async function get_messages_collection(request, response, next) {
    try {
        if (request._type_content === undefined) {
            /** Split messages_id query to an array of id. */
            const result = await use_case.queries.read_messages_collection_service(request.query.offset, request.query.limit, request.query.sort, request.query.order);
            creat_message_response_structure(request, result, 'Welcome_Messages_Collection_Resource', 'collection');
        }
    } catch (e) {
        creat_message_response_structure(request, e.message, 'Welcome_Messages_Collection_Resource', 'internet_server_with_errors', true);
    } finally {
        next();
    }
}

/**
 * MiddlewareController GET_MESSAGE_BY_ID.
 *
 * @module Message
 * @function
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @param {Function} next - Callback next express.
 */
async function get_messages_by_id(request, response, next) {
    try {
        if (request._type_content === undefined) {
            /** Split messages_id query to an array of id. */
            const result = await use_case.queries.read_messages_by_id_service(request.params.message_id);
            if (result.length) {
                creat_message_response_structure(request, result, 'Welcome_Messages_Resource', 'object');
            } else {
                creat_message_response_structure(request, `Le message avec l'id = ${request.params.message_id} n'existe pas!`, 'Welcome_Messages_Resource', 'not_found_with_errors', true);
            }
        }
    } catch (e) {
        creat_message_response_structure(request, e.message, 'Welcome_Messages_Resource', 'internet_server_with_errors', true);
    } finally {
        next();
    }
}

module.exports = {
    get_messages_by_id,
    get_messages_collection,
};
