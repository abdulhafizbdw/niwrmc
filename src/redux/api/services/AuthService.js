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
    getUsers: builder.mutation({
      query: (req) => ({
        url: `/all_users`,
        method: 'POST',
        body: req,
      }),
    }),

    editUser: builder.mutation({
      query: (req) => ({
        url: `/user/edit`,
        method: 'POST',
        body: req,
      }),
    }),
    deleteUser: builder.mutation({
      query: (req) => ({
        url: `/user/delete`,
        method: 'POST',
        body: req,
      }),
    }),
    changePassword: builder.mutation({
      query: (req) => ({
        url: `/user/change`,
        method: 'POST',
        body: req,
      }),
    }),
    getProfile: builder.mutation({
      query: (req) => ({
        url: `/user/profile`,
        method: 'POST',
        body: req,
      }),
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useLoginAccountMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useGetProfileMutation,
  useGetUsersMutation,
} = injectedUserApi;
