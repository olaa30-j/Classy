import express from 'express';
import {createPost, getUserPosts, likePosts, getAllPosts} from '../controller/post.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/create',createPost);
router.patch('/:id/likeposts', verifyToken, likePosts);
router.get('/:userId/userpost', verifyToken, getUserPosts);

export default router;