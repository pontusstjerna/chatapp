const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        msg: {
            type: String,
            required: true,
        },
        time_stamp: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.ObjectID,
            ref: 'User',
            required: true
        },
        room: {
            type: Schema.ObjectID,
            ref: 'Room',
            required: true
        }
    });

//Export model
module.exports = mongoose.model('Message', MessageSchema);
