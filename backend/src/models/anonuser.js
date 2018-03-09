import Mongoose from 'mongoose';

class AnonUserSchema extends Mongoose.Schema {
    constructor() {
        super({
            nickname: {
                type: String,
                required: true,
                unique: true,
                max: 100,
            }
        });
    }
}

export default Mongoose.model('AnonUser', new AnonUserSchema());
