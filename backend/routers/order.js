import express from 'express';
import orderService from '../services/order.js';

const router = express.Router();

router.use('/', orderService);

export default router;