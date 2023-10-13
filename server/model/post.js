import mongoose from 'mongoose';

const PostSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
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
        location: {
            type: String,
            minLength: 1,
            maxLength: 100,
            default: ''
        },
        description: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 1000,
        },
        postPicture: {
            type: String,
            default: ''
        },
        picture: {
            type: String,
            default: ''
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        comment: {
            type: Array,
            default: [],
        }
    },
    { timestamps: true }
)
const Post = mongoose.model('post', PostSchema);
export default Post;