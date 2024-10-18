import mongoose from 'mongoose';  // Use ES module import
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;  // Use ES module export
