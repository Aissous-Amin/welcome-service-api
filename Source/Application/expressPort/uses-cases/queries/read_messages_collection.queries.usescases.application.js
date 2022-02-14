const { Mongoose } = require(__moduleAliases.Persistance);

/**
 * Allows to find all the message respecting the filter.
 *
 * @param {number} offset - Page number.
 * @param {number} limit - Number of element per page.
 * @returns {object} Result - All welcome messages with details information.
 */
function read_messages_collection_service(
  offset = 1,
  limit = 10,
  sort = "_id",
  order = 1
) {
  return Mongoose.queries.messages.get_message_collection(
    offset,
    limit,
    sort,
    order
  );
}

/**
 * Allows to find message by id.
 *
 * @param {number} message_id - message id.
 * @returns {object} Result - All welcome messages with details information.
 */
function read_messages_by_id_service(message_id) {
  return Mongoose.queries.messages.get_message_by_id(message_id);
}

/**
 * Get message count.
 *
 * @returns {object} Result - All welcome messages with details information.
 */
function read_messages_count() {
  return Mongoose.queries.messages.get_message_count();
}

/**
 * Return all messages respecting the input filter.
 *
 * @param {object} query - Object with filter settings.
 * @returns {Promise<object>}
 */
module.exports = {
  read_messages_collection_service,
  read_messages_by_id_service,
  read_messages_count,
};
