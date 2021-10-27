/**
 * Allows to find all the welcome message information.
 *
 * @param {number} message_id - welcome message id.
 * @returns {string} Result - All welcome message with details information.
 */
function get_welcome_messages_by_id(message_id) {
    // todo connect to mongoose data base and implementation the pagination system
    const message = `Welcome To API Service version ${message_id}`;
    return {
        message,
    };
}

module.exports = {
    get_welcome_messages_by_id,
};
