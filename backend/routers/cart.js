import express from 'express';
import cartService from '../services/cart.js';

const router = express.Router();

router.use('/', cartService);

export default router;