import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://giggles-fdd233d1e684.herokuapp.com/', credentials: 'include', mode: 'cors' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Product', 'Review'],
  endpoints: (builder) => ({}),
});
