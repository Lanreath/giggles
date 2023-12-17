import { apiSlice } from "./apiSlice";
const REVIEWS_URL = "/api/reviews";

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: () => ({
                url: `${REVIEWS_URL}`,
                method: "GET",
            }),
            providesTags: ["Review"],
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
                user: data,
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${REVIEWS_URL}/myreviews`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Review"],
        }),
        updateReview: builder.mutation({
            query: (data) => ({
                url: `${REVIEWS_URL}/myreviews`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Review"],
        }),
        deleteReview: builder.mutation({
            query: (data) => ({
                url: `${REVIEWS_URL}/myreviews`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Review"],
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