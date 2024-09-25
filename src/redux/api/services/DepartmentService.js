import { api } from '..';

const injectedUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => ({
        url: `/department`,
      }),
    }),
  }),
});

export const { useGetDepartmentsQuery } = injectedUserApi;
