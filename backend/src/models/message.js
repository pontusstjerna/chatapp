const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        msg: {type: String, required: true},
        time_stamp:{type: String, required: true},
        user: {type: Schema.ObjectID, ref: 'User', required: true},
        room: {type: Schema.ObjectID, ref: 'Room', required: true}
    });

// Virtual for message URL
MessageSchema.virtual('url')
  .get(function () {
      return '/catalog/message/' + this._id;
  });

//Export model
module.exports = mongoose.model('Message', MessageSchema);