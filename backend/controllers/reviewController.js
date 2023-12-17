import asyncHandler from 'express-async-handler';
import Review from "../models/reviewModel.js";

// @desc    Fetch all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({});
  if (!reviews) {
    res.status(404);
    throw new Error('No reviews found');
  }
  res.status(200);
  res.json(reviews);
});

// @desc    Fetch single review
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(400);
    throw new Error('Review not found');
  }
  res.status(200);
  res.json(review);
});

// @desc    Fetch reviews by user
// @route   GET /api/reviews/myreviews
// @access  Private
const getReviewsByUser = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ owner: req.user._id});
  if (!reviews) {
    res.status(400);
    throw new Error('No reviews found');
  }
  res.status(200);
  res.json(reviews);
});

// @desc    Fetch reviews by product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getReviewsByProductId = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId });
  if (!reviews) {
    res.status(400);
    throw new Error('No reviews found');
  }
  res.status(200);
  res.json(reviews);
});

// @desc    Create a review
// @route   POST /api/reviews/myreviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { title, rating, comment, product} = req.body;
  const review = new Review({
    title,
    rating,
    comment,
    owner: req.user._id,
    product: product._id,
  });

  const createdReview = await review.save();
  res.status(201).json(createdReview);
});

// @desc    Update a review
// @route   PUT /api/reviews/myreviews
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(
    req.review._id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(review);
});

// @desc    Delete a review
// @route   DELETE /api/reviews/myreviews
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const reviewDelete = await Review.findByIdAndDelete(req.review._id);
    res.status(200).json(reviewDelete);
  } catch (error) {
    res.status(400);
    throw new Error('Review not found');
  }
});

export {
  getReviews,
  getReviewById,
  getReviewsByUser,
  getReviewsByProductId,
  createReview,
  updateReview,
  deleteReview,
};