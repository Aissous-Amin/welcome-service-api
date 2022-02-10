const { Messages } = require('../schemas/messages.schemas');

/**
 * Allows to find message by message_id.
 *
 * @param {Number} messages_id - List of band id.
 * @returns {object} Result - Messages informations.
 */
function get_message_by_id(messages_id) {
    return Messages.find({ _id: messages_id});
}

/**
 * Allows to get all message collection.
 *
 * @param {Number} offset - Page number.
 * @param {Number} limit - Limit per page.
 * @param {String} sort - Sort by element.
 * @param {Number} order - Order Asc= 1, Desc = -1.
 * @returns {object} Result - All messages with details information.
 */
function get_message_collection(offset, limit, sort, order) {
    const skip = Math.floor((limit * offset) - limit);
    return Messages.aggregate([
        { $sort: { sort: parseInt(order) } },
        { $skip: skip },
        { $limit: parseInt(limit) },
    ]);
}

function get_message_count() {
    return Messages.countDocuments();
}




module.exports = {
    get_message_by_id,
    get_message_collection,
    get_message_count
};
