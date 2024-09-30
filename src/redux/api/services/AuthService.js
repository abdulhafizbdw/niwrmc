import { api } from '..';

const injectedUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (req) => ({
        url: `/signup`,
        method: 'POST',
        body: req,
      }),
    }),
    loginAccount: builder.mutation({
      query: (req) => ({
        url: `/login`,
        method: 'POST',
        body: req,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `/all_users`,
      }),
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useLoginAccountMutation,
  useGetUsersQuery,
} = injectedUserApi;
