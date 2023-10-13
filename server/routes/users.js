import express from 'express';
import {
    getUser,
    getUserFriends,
    addFriend,
    removeFriend
} from "../controller/user.js";
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

// Read
router.get("/:id", getUser);
router.get("/getfriends/:id",  verifyToken, getUserFriends);

//update
router.patch("/:userId/:friendId", verifyToken, addFriend);

// delete
router.delete("/:userId/:friendId", verifyToken, removeFriend);

export default router;