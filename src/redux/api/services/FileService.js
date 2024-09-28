import { api } from '..';

const injectedUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createFile: builder.mutation({
      query: (req) => ({
        url: `/file`,
        method: 'POST',
        body: req,
      }),
    }),
    getFileByDepartments: builder.mutation({
      query: (req) => ({
        url: `/file/by-departments`,
        method: 'POST',
        body: req,
      }),
    }),
    transferFile: builder.mutation({
      query: (req) => ({
        url: `/file/transfer`,
        method: 'POST',
        body: req,
      }),
    }),
    getPendingFiles: builder.mutation({
      query: (req) => ({
        url: `/file/pending`,
        method: 'POST',
        body: req,
      }),
    }),
  }),
});

export const {
  useCreateFileMutation,
  useGetFileByDepartmentsMutation,
  useTransferFileMutation,
  useGetPendingFilesMutation,
} = injectedUserApi;
