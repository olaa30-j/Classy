import Post from '../model/post.js'
import User from '../model/auth.js';


// Create
export const createPost = async (req, res) => {
    try {
        const {
            userId,
            postPicture,
            description,
        } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }        
        console.log("user", user._id)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            postPicture,
            picture: user.picture,
            likes: {},
            comment: [],
        })
    console.log('newPost', newPost )
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Read
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getUserPosts = async(req, res)=>{
    try{
        const { userId } = req.params;
        console.log('get user posts User ID:', userId);
        const userPosts = await Post.find({userId});
        res.status(200).json(userPosts)
    }catch(error){
        res.status(404).json({ message: "User`s posts not found" })
    }
}


// handle like post 
export const likePosts = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Received post ID:', id);
        const { userId } = req.body;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        const isLiked = post.likes.get(userId);

        // Toggle the like
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        // Update the post with the modified likes
        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatePost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deletePost=async()=>{

}
// export const uploadPost = async (req, res) => {

// }

// export const deletePost = async (req, res) => {
//     try {
//         await Post.remove();
//         res.statu(201).json({ message: 'Post is deleted successfully' });
//     } catch (error) {
//         res.statu(400).json({ message: 'delete operation doesnot success' }, err.message)
//     }
// }