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
    getTransferedFiles: builder.mutation({
      query: (req) => ({
        url: `/file/transfered`,
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
    editFile: builder.mutation({
      query: (req) => ({
        url: `/file/edit`,
        method: 'POST',
        body: req,
      }),
    }),
    deleteFile: builder.mutation({
      query: (req) => ({
        url: `/file/delete`,
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
  useEditFileMutation,
  useGetTransferedFilesMutation,
  useDeleteFileMutation,
} = injectedUserApi;
