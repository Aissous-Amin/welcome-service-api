const httpStatus = require('http-status');
const moment = require('moment');

/**
 * Create_structure function : initialization of the response object structure.
 *
 * @param {string} resource_type - Resource type : domain entities information.
 * @param {object} resource - Response body object.
 * @param {object} links - Link resource information : HATEOAS.
 * @returns {object} Structure - Final response body object structure.
 */
function create_structure(resource_type, resource, links) {
    const structure = {};
    structure._resource_type = (resource_type !== '' ? resource_type : 'Resource_Error');
    structure._resource = resource;
    structure._links = links;
    structure._etag = moment().format('MMMM Do YYYY, h:mm:ss a');
    return structure;
}

/**
 * Message_error function.
 *
 * @param {object} options - Errors message options fields.
 * @returns {object} Message_error_object - Error standard object structure.
 */
function message_error(options) {
    const message_error_object = {};
    message_error_object._api_status_code = options.api_status_code || 4000;
    message_error_object._api_status_message = options.api_status_message || 'Default Message Error';
    message_error_object._api_status_id = options.request_id || '00000-00000-00000-00000-00000'; // TODO apply the request_id logic, you can use the same correlation id with app insight to propagate the context information across all your services.
    message_error_object._details = options.details || [];
    console.error(`${message_error_object._api_status_message}`);
    return message_error_object;
}

/**
 * creat_hateoas_structure function.
 * TODO : you have to configure HATEOAS based on your needs. You find below some examples and explanation
 * This function implement the RFC 5988 for building links that define the relationships between our resources.
 * Each resource in RFC 5988 contains the following properties: { href: Target URI, rel: Link relation type, type: Attributes for target IRI }
 * Use case :
 * We can configure this section to determine what actions a user has access to.
 * Therefore, the client does not need to know anything about roles or states of entities.
 * All the actions on the screen are enabled/disabled/visible based on the presence of links.
 * @param {object} request - Express request object.
 * @returns {object} hateoas_structure - The hateoas structure RFC 5988 format.
 */
function creat_hateoas_structure(request, collection = false) {
    const hateoas_object = {};
    const links_tab = [];
    const self = {
        href: `${request.protocol + '://' + request.get('host') + request.originalUrl}`,
        rel: `self`,
        type: `${request.method}`,
    };
    links_tab.push(self);
    if(collection) {
        hateoas_object.web_pages = paginate(request, self.href);
    }
    hateoas_object.web_links = links_tab;
    // you can add some hateoas logic here

    return hateoas_object;
}

function paginate(request, self) {
    request.query.offset = request.query.offset + 1;
    return {
        self: `${self}`,
        next: '',
        prev: '',
    }
}


/**
 * Middleware ExpressResponseController.
 *
 * @module ExpressResponseController
 * Allows you to control the body response with a centralized logic by manipulating only the type_content of the request
 * @function
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 */
module.exports.ExpressResponseController = (request, response) => {
    try {
        switch (request._type_content) {
            case 'object': {
                const resource = request._resource !== undefined ? request._resource : {};
                const structure = create_structure(request._resource_type, resource, creat_hateoas_structure(request, true));
                structure._request_id = request._request_id;
                response.status(httpStatus.OK).json(structure);
                break;
            }
            case 'collection': {
                const resource = request._resource !== undefined ? request._resource : {};
                const structure = create_structure(request._resource_type, resource, creat_hateoas_structure(request, true));
                structure._request_id = request._request_id;
                response.status(httpStatus.OK).json(structure);
                break;
            }
            case 'bad_request_with_errors': {
                request._resource = message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 4000,
                    api_status_message: httpStatus['400_NAME'],
                    details: request._details ? request._details : [],
                });
                const structure = create_structure('', request._resource, {self: request.url});
                structure._request_id = request._request_id;
                response.status(httpStatus.BAD_REQUEST).json(structure)
                    .end();
                break;
            }
            case 'internal_server_with_errors': {
                request._resource = message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 5000,
                    api_status_message: httpStatus['500_NAME'],
                    request_id: request._request_id,
                    details: request._details ? request._details : [],
                });
                const structure = create_structure('', request._resource, {self: request.url});
                structure._request_id = request._request_id;
                response.status(httpStatus.INTERNAL_SERVER_ERROR).json(structure)
                    .end();
                break;
            }
            case 'not_found_with_errors': {
                request._resource = message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 4004,
                    api_status_message: httpStatus['404_NAME'],
                    request_id: request._request_id,
                    details: request._details ? request._details : [],
                });
                const structure = create_structure('', request._resource, {self: request.url});
                structure._request_id = request._request_id;
                response.status(httpStatus.NOT_FOUND).json(structure)
                    .end();
                break;
            }
            case 'conflict_with_errors': {
                request._resource = message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 4009,
                    api_status_message: httpStatus['409_NAME'],
                    request_id: request._request_id,
                    details: request._details ? request._details : [],
                });
                const structure = create_structure('', request._resource, {self: request.url});
                structure._request_id = request._request_id;
                response.status(httpStatus.CONFLICT).json(structure)
                    .end();
                break;
            }
            default: {
                request._resource = message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 5000,
                    api_status_message: httpStatus['500_NAME'],
                    request_id: request._request_id,
                    details: [{message: 'Type_Content is not defined!'}],
                });
                const structure = create_structure('', request._resource, {self: request.url});
                structure._request_id = request._request_id;
                response.status(httpStatus.INTERNAL_SERVER_ERROR).json(structure)
                    .end();
                break;
            }
        }
    } catch (error) {
        console.error(error.message);
        throw new Error(`ExpressResponseController Error! ${error}`);
    } finally {
        /**
         * We can add interesting features here if we want...
         */
    }
};
