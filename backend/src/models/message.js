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
            kind: String,
            item: {
                type: Schema.ObjectId,
                refPath: 'user.kind',
                required: true
            }
        },
        room: {
            type: Schema.ObjectId,
            ref: 'Room',
            required: true
        }
    });

//Export model
module.exports = mongoose.model('Message', MessageSchema);
