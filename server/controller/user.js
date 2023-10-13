import User from "../model/auth.js";

// Get user by id 
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Received _id:", id);

        const user = await User.findById(id); 
        console.log("User from database:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



// Get all user`s friends
export const getUserFriends = async (req, res) => {
    try { 
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                picture,
                location,
                occupation,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    picture,
                    location,
                    occupation,
                }
            })
        res.status(201).json(formattedFriends)
    } catch (error) {
        res.status(404).json("can not get the user`s friends", { message: error.message })
    }
}

// Put
export const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;

        const cleanedFriendId = friendId.trim();

        const user = await User.findById(userId);
        const friend = await User.findById(cleanedFriendId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!friend) {
            return res.status(404).json({ error: 'Friend not found' });
        }

        user.friends.addToSet(cleanedFriendId); // addToSet ensures uniqueness
        await user.save();

        res.status(200).json(user.friends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Delete
export const removeFriend = async (req, res) => {
    const { userId, friendId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.friends.pull(friendId);
        await user.save();

        // Retrieve the updated user with the friends list
        const updatedUser = await User.findById(userId);

        res.status(200).json({
            message: 'Friend removed successfully',
            friends: updatedUser.friends,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
