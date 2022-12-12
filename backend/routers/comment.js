import express from 'express';
import commentService from '../services/comment.js';

const router = express.Router();

router.use('/', commentService);

export default router;