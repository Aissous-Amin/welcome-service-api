const moment = require("moment");

/**
 * This function allows us to manage the pagination.
 *
 * @param {string} url - Self Url.
 * @param {Number} page - Page number Limit + Skip.
 * @param {Number} objectPerPage - object per page number.
 * @param {Number} count - Number of total object.
 * @returns {string} URL - URL with limit and skip option.
 */
function parse_url_page(url, page, objectPerPage, count) {
    const offset = page !== undefined ? `offset=${page}` : `offset=1`;
    const limit = objectPerPage !== undefined ? `limit=${objectPerPage}` : `limit=10`;
    page = parseInt(page, 10) >= 0 ? page : 0;
    const total_pages_number = Math.floor(parseInt(count) / parseInt(objectPerPage));
    const skip_url = url.indexOf("?") > -1 ? `&${offset}` : `?${offset}`;
    const limit_url = url.indexOf("?") > -1 ? `&${limit}` : `?${limit}`;
    const self = url.indexOf("offset=") > -1
            ? url.replace(/offset=[^&]+/, `offset=${page}`)
            : url + skip_url + limit_url;
    const next =  parseInt(page) >= total_pages_number
        ? ''
        : url.replace(/offset=[^&]+/, `offset=${Math.floor(parseInt(page) + 1)}`);
    const prev = parseInt(page) > 1
        ? url.replace(/offset=[^&]+/, `offset=${Math.floor(parseInt(page) - 1)}`)
        : '';
    return {
        total_object_number: count,
        total_pages_number,
        self,
        next,
        prev,
    };
}

/**
 * This function is a Intermediate Function Inheritance - une fonction intermédiaire qui permet de mettre en place l'héritage et de changer la chaine prototypique
 *
 * @param {Object} Child - Object Child
 * @param {Object} Parent - Object Parent
 */
function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

/**
 * escapeRegex Function
 * Regex function for search functionality
 * @param {string} string - char to pars
 */
const escapeRegex = (string) => {
    return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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
        hateoas_object.web_pages = parse_url_page(self.href, request.query.offset, request.query.limit, request.query.count);
    }
    hateoas_object.web_links = links_tab;
    // you can add some hateoas logic here

    return hateoas_object;
}

module.exports = {
    parse_url_page,
    extend,
    escapeRegex,
    message_error,
    create_structure,
    creat_hateoas_structure
};
