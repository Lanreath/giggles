import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import dotenv from 'dotenv';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.API_URL});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Product', 'Review'],
  endpoints: (builder) => ({}),
});
