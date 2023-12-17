import express from 'express'
import {
    getReviews,
    getReviewById,
    getReviewsByUser,
    getReviewsByProductId,
    createReview,
    updateReview,
    deleteReview,
} from '../controllers/reviewController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/myreviews')
    .get(protect, getReviewsByUser)
    .post(protect, createReview)
    .put(protect, updateReview)
    .delete(protect, deleteReview)

router.get('/product/:productId', getReviewsByProductId)

router.get('/', getReviews)
router.get('/:id', getReviewById)

export default router