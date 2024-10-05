import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  type: '',
  creation_date: '', // or null, depending on your use case
  comments: [],
  uploads: [],
  department: '',
  transferedTo: {},
  reviewPending: false,
  originalDepartment: {},
  transferedId: '',
};
const currentFileSlice = createSlice({
  name: 'currentFile',
  initialState: initialState,
  reducers: {
    setCurrentFile: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCurrentFile } = currentFileSlice.actions;

export default currentFileSlice.reducer;
