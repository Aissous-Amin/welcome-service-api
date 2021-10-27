const persistance = require(__moduleAliases.Persistance);

/**
 * Allows to find all the welcome message respecting the filter : message_id.
 *
 * @param {number} message_id - message id.
 * @returns {object} Result - All welcome messages with details information.
 */
function read_welcome_messages_service({ message_id }) {
    if (message_id) {
        return persistance.mongoose.queries.messages.get_message_by_id(message_id);
    }
    return [];
}

/**
 * Return all concerts respecting the input filter.
 *
 * @param {object} query - Object with filter settings.
 * @returns {Promise<object>}
 */
module.exports = query => read_welcome_messages_service(query);
