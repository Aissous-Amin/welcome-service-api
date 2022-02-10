const { get_messages_by_id, get_messages_collection } = require('./messages.controller.middleware.application');

module.exports = {
    get_messages_collection,
    get_messages_by_id,
};
