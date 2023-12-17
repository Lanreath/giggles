import { apiSlice } from "./apiSlice";
const PRODUCTS_URL = "/api/products";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: "GET",
            }),
            providesTags: ["Product"],
        }),
        getProduct: builder.query({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.id}`,
                method: "GET",
            }),
        }),
        getProductsByCategory: builder.query({
            query: (data) => ({
                url: `${PRODUCTS_URL}/category/${data.category}`,
                method: "GET",
            }),
        }),
        getProductsByUser: builder.query({
            query: (data) => ({
                url: `${PRODUCTS_URL}/myproducts/`,
                method: "GET",
                user: data,
            }),
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/myproducts`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/myproducts`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/myproducts`,
                method: "DELETE",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetProductsByCategoryQuery,
    useGetProductsByUserQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApiSlice;