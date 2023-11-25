import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    loginattempts: {
        type: Number,
        default: 0,
    },
    isblocked:{
        type: Boolean,
        default: false,
    }
})

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;