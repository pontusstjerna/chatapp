import Mongoose from 'mongoose';

class MessageSchema extends Mongoose.Schema {
    constructor() {
        super({
            text: {
                type: String,
                required: true,
            },
            time_stamp: {
                type: Date,
                default: Date.now
            },
            user: {
                kind: {
                    type: String,
                    required: true,
                    enum: ['User', 'AnonUser']
                },
                item: {
                    type: Mongoose.Schema.ObjectId,
                    refPath: 'user.kind',
                    required: true
                }
            },
            room: {
                type: Mongoose.Schema.ObjectId,
                ref: 'Room',
                required: true
            }
        })
    }
}
//Export model
export default Mongoose.model('Message', new MessageSchema());
