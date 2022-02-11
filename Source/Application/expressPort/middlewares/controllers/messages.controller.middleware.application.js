const use_case = require('../../uses-cases');
const { creat_response_structure } = require(__moduleAliases.Utils).functionality;
/**
 * @typedef {WelcomeSchema} WelcomeSchema
 */


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
            const result = await use_case.queries.read_messages_collection_service(request.query.offset, request.query.limit, request.query.sort, request.query.order);
            request.query.count = await use_case.queries.read_messages_count();
            creat_response_structure(request, result, 'Welcome_Messages_Collection_Resource', 'collection');
        }
    } catch (e) {
        creat_response_structure(request, e.message, '', 'internet_server_with_errors', true);
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
            const result = await use_case.queries.read_messages_by_id_service(request.params.message_id);
            if (result.length) {
                creat_response_structure(request, result, 'Welcome_Messages_Resource', 'object');
            } else {
                creat_response_structure(request, `Le message avec l'id = ${request.params.message_id} n'existe pas!`, 'Welcome_Messages_Resource', 'not_found_with_errors', true);
            }
        }
    } catch (e) {
        creat_response_structure(request, e.message, '', 'internet_server_with_errors', true);
    } finally {
        next();
    }
}

module.exports = {
    get_messages_by_id,
    get_messages_collection,
};
