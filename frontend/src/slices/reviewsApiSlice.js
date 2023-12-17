import { apiSlice } from "./apiSlice";
const REVIEWS_URL = "/api/reviews";

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: () => ({
                url: `${REVIEWS_URL}`,
                method: "GET",
            }),
        }),
        getReview: builder.query({
            query: (data) => ({
                url: `${REVIEWS_URL}/${data.id}`,
                method: "GET",
            }),
        }),
        getReviewsByProduct: builder.query({
            query: (data) => ({
                url: `${REVIEWS_URL}/product/${data.id}`,
                method: "GET",
            }),
        }),
        getReviewsByUser: builder.query({
            query: (data) => ({
                url: `${REVIEWS_URL}/myreviews`,
                method: "GET",
                body: data,
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${REVIEWS_URL}/myreviews`,
                method: "POST",
                body: data,
            }),
        }),
        updateReview: builder.mutation({
            query: (data) => ({
                url: `${REVIEWS_URL}/myreviews`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteReview: builder.mutation({
            query: (data) => ({
                url: `${REVIEWS_URL}/myreviews`,
                method: "DELETE",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useGetReviewQuery,
    useGetReviewsByProductQuery,
    useGetReviewsByUserQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApiSlice;