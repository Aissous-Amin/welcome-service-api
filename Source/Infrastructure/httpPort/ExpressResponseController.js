const httpStatus = require('http-status');
const { functionality } = require('../../Utils')


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
                const structure = functionality.create_structure(request._resource_type, resource, functionality.creat_hateoas_structure(request, false));
                structure._request_id = request._request_id;
                response.status(httpStatus.OK).json(structure);
                break;
            }
            case 'collection': {
                const resource = request._resource !== undefined ? request._resource : {};
                const structure = functionality.create_structure(request._resource_type, resource, functionality.creat_hateoas_structure(request, true));
                structure._request_id = request._request_id;
                response.status(httpStatus.OK).json(structure);
                break;
            }
            case 'bad_request_with_errors': {
                request._resource = functionality.message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 4000,
                    api_status_message: httpStatus['400_NAME'],
                    details: request._details ? request._details : [],
                });
                const structure = functionality.create_structure('', request._resource, {self: request.url});
                structure._request_id = request._request_id;
                response.status(httpStatus.BAD_REQUEST).json(structure)
                    .end();
                break;
            }
            case 'internal_server_with_errors': {
                request._resource = functionality.message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 5000,
                    api_status_message: httpStatus['500_NAME'],
                    request_id: request._request_id,
                    details: request._details ? request._details : [],
                });
                const structure = functionality.create_structure('', request._resource, {self: request.url});
                structure._request_id = request._request_id;
                response.status(httpStatus.INTERNAL_SERVER_ERROR).json(structure)
                    .end();
                break;
            }
            case 'not_found_with_errors': {
                request._resource = functionality.message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 4004,
                    api_status_message: httpStatus['404_NAME'],
                    request_id: request._request_id,
                    details: request._details ? request._details : [],
                });
                const structure = functionality.create_structure('', request._resource, {self: request.url});
                structure._request_id = request._request_id;
                response.status(httpStatus.NOT_FOUND).json(structure)
                    .end();
                break;
            }
            case 'conflict_with_errors': {
                request._resource = functionality.message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 4009,
                    api_status_message: httpStatus['409_NAME'],
                    request_id: request._request_id,
                    details: request._details ? request._details : [],
                });
                const structure = functionality.create_structure('', request._resource, {self: request.url});
                structure._request_id = request._request_id;
                response.status(httpStatus.CONFLICT).json(structure)
                    .end();
                break;
            }
            default: {
                request._resource = functionality.message_error({
                    api_status_code: request._api_status_code ? request._api_status_code : 5000,
                    api_status_message: httpStatus['500_NAME'],
                    request_id: request._request_id,
                    details: [{message: 'Type_Content is not defined!'}],
                });
                const structure = functionality.create_structure('', request._resource, {self: request.url});
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
