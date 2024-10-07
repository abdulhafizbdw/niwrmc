import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  company: '',
  creation_date: null,
  comments: [],
  uploads: [],
  department: '',
  projectDone: false,
  originalDepartment: {
    name: '',
    id: '',
  },
  startDate: null,
  endDate: null,
  milestone: [],
};
const currentProjectSlice = createSlice({
  name: 'currentProject',
  initialState: initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCurrentProject } = currentProjectSlice.actions;

export default currentProjectSlice.reducer;
