import express from 'express';
import userService from '../services/user.js';

const router = express.Router();

router.use('/', userService);

export default router;