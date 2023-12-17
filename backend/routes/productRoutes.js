import express from 'express';
import {
    getProducts,
    getProductById,
    getProductsByUser,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);

router.route('/myproducts').get(protect, getProductsByUser);
router.route('/category/:category').get(getProductsByCategory);

export default router;