const { Messages } = require('../schemas/messages.schemas');

/**
 * Allows to find message by message_id.
 *
 * @param {number} bandIds - List of band id.
 * @returns {object} Result - All concerts with details of band and venue information.
 */
function get_message_by_id(message_id) {
    /*return Messages.find({
        message_id: message_id
    });*/

    return Messages.aggregate([
        { $match: { message_id: { $in: message_id } } },
    ]);
}


module.exports = {
    get_message_by_id,
};
