import Mongoose from 'mongoose';

class UserSchema extends Mongoose.Schema {
    constructor() {
        super({
            email: {
              type: String,
              max: 100,
            },
            nickname: {
                type: String,
                required: true,
                unique: true,
                max: 100,
            },
            password: {
                type: String,
                required: true,
                max: 100
            },
            about: {
              type: String,
              max: 500,
            }
        });
    }
}

export default Mongoose.model('User', new UserSchema());
