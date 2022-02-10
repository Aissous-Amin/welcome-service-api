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

module.exports = {
    parse_url_page,
    extend,
    escapeRegex,
};
