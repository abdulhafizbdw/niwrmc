import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://niwrmcdev.fly.dev/';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),

  keepUnusedDataFor: 3000,
});
