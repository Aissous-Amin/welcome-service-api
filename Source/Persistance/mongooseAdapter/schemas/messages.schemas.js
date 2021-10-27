const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
    message_id: {
        type: String,
    },
    message: {
        type: String,
    },
});

messageSchema.virtual('messages', {
    ref: 'Message', // The model to use
    localField: '_id', // Find concert where `localField`
    foreignField: 'message', // is equal to `foreignField`
});

module.exports.Messages = mongoose.model('Message', messageSchema);
