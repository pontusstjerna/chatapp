import Mongoose from 'mongoose';

class RoomSchema extends Mongoose.Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true,
                unique: true,
                max: 50,
                min: 3
            },
            description: {
                type: String,
                default: ""
            }
        });
    }
}

export default Mongoose.model('Room', new RoomSchema());
