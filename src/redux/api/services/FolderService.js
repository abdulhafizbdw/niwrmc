import { api } from '..';

const injectedUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation({
      query: (req) => ({
        url: `/folder`,
        method: 'POST',
        body: req,
      }),
    }),
    getFolderByDepartments: builder.mutation({
      query: (req) => ({
        url: `/folder/by-departments`,
        method: 'POST',
        body: req,
      }),
    }),

    editFolder: builder.mutation({
      query: (req) => ({
        url: `/folder/edit`,
        method: 'POST',
        body: req,
      }),
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useGetFolderByDepartmentsMutation,
  useEditFolderMutation,
} = injectedUserApi;
