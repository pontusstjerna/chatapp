import Mongoose from 'mongoose';

class UserSchema extends Mongoose.Schema {
    constructor() {
        super({
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
        });
    }
}

export default Mongoose.model('User', new UserSchema());