/**
 * This function allows us to manage the pagination.
 *
 * @param {string} url - Self Url.
 * @param {string} page - Page number Limit + Skip.
 * @returns {string} URL - URL with limit and skip option.
 */
function parse_url_page(url, page) {
    const skip = page !== 0 ? `skip=${page}` : "";
    const limit = `limit=10`;
    // eslint-disable-next-line no-param-reassign
    page = parseInt(page, 10) >= 0 ? page : 0;
    const skip_url = url.indexOf("?") > -1 ? `&${skip}` : `?${skip}`;
    const limit_url = url.indexOf("?") > -1 ? `&${limit}` : `?${limit}`;
    const value =
        url.indexOf("skip=") > -1
            ? url.replace(/skip=[^&]+/, `skip=${page}`)
            : url + skip_url + limit_url;
    return value;
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
