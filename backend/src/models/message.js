const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        time_stamp: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        room: {
            type: Schema.ObjectId,
            ref: 'Room',
            required: true
        }
    });

//Export model
module.exports = mongoose.model('Message', MessageSchema);
