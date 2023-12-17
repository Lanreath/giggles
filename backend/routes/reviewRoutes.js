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

router.get('/', getReviews)
router.get('/:id', getReviewById)

router.route('/product')
    .get(getReviewsByProductId)

router.route('/myreviews')
    .get(protect, getReviewsByUser)
    .post(protect, createReview)
    .put(protect, updateReview)
    .delete(protect, deleteReview)

export default router