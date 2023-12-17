import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: localStorage.getItem('products')
        ? JSON.parse(localStorage.getItem('products'))
        : null,
    reviews: localStorage.getItem('reviews')
        ? JSON.parse(localStorage.getItem('reviews'))
        : null,
    productStatus: 'idle',
    reviewStatus: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProducts: (state, action) => {
        state.products = action.payload;
        localStorage.setItem('products', JSON.stringify(action.payload));
    },
    updateProduct: (state, action) => {
        state.products = state.products.map(product => product._id === action.payload._id ? action.payload : product);
        localStorage.setItem('products', JSON.stringify(state.products));
    },
    removeProduct: (state, action) => {
        state.products = state.products.filter(product => product._id !== action.payload);
        localStorage.setItem('products', JSON.stringify(state.products));
    },
    setProductStatus: (state, action) => {
        state.productStatus = action.payload;
    },
    setReviews: (state, action) => {
        state.reviews = action.payload;
        localStorage.setItem('reviews', JSON.stringify(action.payload));
    },
    updateReview: (state, action) => {
        state.reviews = state.reviews.map(review => review._id === action.payload._id ? action.payload : review);
        localStorage.setItem('reviews', JSON.stringify(state.reviews));
    },
    removeReview: (state, action) => {
        state.reviews = state.reviews.filter(review => review._id !== action.payload);
        localStorage.setItem('reviews', JSON.stringify(state.reviews));
    },
    setReviewStatus: (state, action) => {
        state.reviewStatus = action.payload;
    }
  },
});

export const {setProducts, updateProduct, removeProduct, setProductStatus, setReviews, updateReview, removeReview, setReviewStatus } = userSlice.actions;

export default userSlice.reducer;

export const selectProducts = state => state.products;

export const selectReviews = state => state.reviews;
