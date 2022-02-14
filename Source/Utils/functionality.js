const moment = require("moment");
const { Winston } = require("../Infrastructure/managementAdapters");

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
  const limit =
    objectPerPage !== undefined ? `limit=${objectPerPage}` : `limit=5`;
  page = parseInt(page, 10) > 0 ? page : 1;
  objectPerPage = parseInt(objectPerPage, 10) > 0 ? objectPerPage : 5;
  const total_pages_number = Math.ceil(
    parseInt(count) / parseInt(objectPerPage)
  );
  url = url.indexOf("?") > -1 ? `${url}` : `${url}?`;
  const skip_url = url.indexOf("offset=") > -1 ? `` : `&${offset}`;
  const limit_url = url.indexOf("limit=") > -1 ? `` : `&${limit}`;
  url =
    url.indexOf("offset=") > -1
      ? url.replace(/offset=[^&]+/, `offset=${page}`)
      : (url += skip_url);
  if (!url.indexOf("limit=") > -1) url += limit_url;
  const next =
    parseInt(page) >= total_pages_number
      ? ""
      : url.replace(/offset=[^&]+/, `offset=${Math.floor(parseInt(page) + 1)}`);
  const prev =
    parseInt(page) > 1
      ? url.replace(/offset=[^&]+/, `offset=${Math.floor(parseInt(page) - 1)}`)
      : "";
  return {
    total_object_number: count,
    total_pages_number,
    self: url,
    next,
    prev,
  };
}

/**
 * This function is a Intermediate Function Inheritance
 * Une fonction intermédiaire qui permet de mettre en place l'héritage et de changer la chaine prototypique
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
  structure._resource_type =
    resource_type !== "" ? resource_type : "Resource_Error";
  structure._resource = resource;
  structure._links = links;
  structure._etag = moment().format("MMMM Do YYYY, h:mm:ss a");
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
  message_error_object._api_status_code = options.api_status_code ?? 4000;
  message_error_object._api_status_message =
    options.api_status_message ?? "Default Message Error";
  message_error_object._api_status_id =
    options.request_id ?? "00000-00000-00000-00000-00000"; // TODO apply the request_id logic, you can use the same correlation id with app insight to propagate the context information across all your services.
  message_error_object._details = options.details ?? [];
  Winston.error(`${message_error_object._api_status_message}`);
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
    href: `${
      request.protocol + "://" + request.get("host") + request.originalUrl
    }`,
    rel: `self`,
    type: `${request.method}`,
  };
  links_tab.push(self);
  if (collection) {
    hateoas_object.web_pages = parse_url_page(
      self.href,
      request.query.offset,
      request.query.limit,
      request.query.count
    );
  }
  hateoas_object.web_links = links_tab;
  // you can add some hateoas logic here

  return hateoas_object;
}

/**
 * creat_response_structure Response Controller System For message resource endpoint.
 * This function allows to build the message object
 * @module Message
 * @param request
 * @param resource
 * @param resource_type
 * @param type_content
 * @param error
 * @returns {*}
 */
function creat_response_structure(
  request,
  resource,
  resource_type,
  type_content,
  error = false
) {
  if (!error) {
    request._resource = {
      message: resource,
      UserAgent: request.headers["user-agent"],
    };
  } else {
    if (Array.isArray(resource)) {
      request._details = resource;
    } else {
      request._details = [{ message: resource }];
    }
  }
  request._resource_type = resource_type;
  request._type_content = type_content;
  return request;
}

function query_parser(elements) {
  Object.keys(elements).map((key) => parseInt(elements[key]));
  return elements;
}

function objectParsInt(obj) {
  const res = {};
  Object.keys(obj).forEach((key) => {
    res[key] = {};
    Object.keys(obj[key]).forEach((temp) => {
      res[key][temp] = !isNaN(obj[key][temp])
        ? parseInt(obj[key][temp], 10)
        : obj[key][temp];
    });
  });
  return res;
}

/**
 * Used to validate the input object based on the joi schema.
 *
 * @param {object} object - Object input to validate.
 * @param {object} joiSchema - Joi schema object model.
 * @returns {{valid: boolean, validation_errors: []}}
 */
function validate_input_object(object, joiSchema) {
  const { error } = joiSchema.validate(object);
  const valid = error == null;
  const validation_errors = error
    ? error.details.map((elm) => elm.message)
    : [];
  return { valid, validation_errors, error };
}

module.exports = {
  parse_url_page,
  extend,
  escapeRegex,
  message_error,
  create_structure,
  creat_hateoas_structure,
  creat_response_structure,
  query_parser,
  objectParsInt,
  validate_input_object,
};
