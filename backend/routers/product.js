import express from 'express';
import productService from '../services/product.js';

const router = express.Router();

router.use('/', productService);

export default router;