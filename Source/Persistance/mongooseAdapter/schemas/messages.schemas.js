const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  message_id: {
    type: String,
  },
  message: {
    type: String,
  },
});

/*messageSchema.virtual('messages', {
    ref: 'Message', // The model to use
    localField: '_id', // Find message where `localField`
    foreignField: 'message', // is equal to `foreignField`
});*/

/*Compiling mongoose Schema to a Model*/
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
