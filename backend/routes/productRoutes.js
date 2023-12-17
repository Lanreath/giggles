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

router
    .route('/myproducts')
    .get(protect, getProductsByUser)
    .post(protect, createProduct)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct);

router
    .route('/category/:category')
    .get(getProductsByCategory);

router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;