import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    friends: {
        type: Array,
        default: []
    },
    picture: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        minLength: 1,
        maxLength: 100,
        default: ''
    },
    occupation: {
        type: String,
        minLength: 1,
        maxLength: 100,
        default: ''
    },
    viewedProfile: Number,
    impressions: Number,
},
    { timestamps: true }
);

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;