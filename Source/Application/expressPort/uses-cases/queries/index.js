const { read_messages_collection_service, read_messages_by_id_service } = require('./read_messages_collection.queries.usescases.application');

module.exports = {
    read_messages_collection_service,
    read_messages_by_id_service,
};
