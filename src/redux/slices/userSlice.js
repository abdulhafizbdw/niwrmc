import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onboarded: false,
  email: '',
  password: '',
  token: '',
  department: [],
  fullName: '',
  role: '',
  lastFile: 0,
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    onboardUser: (state) => {
      state.onboarded = true;
    },
    setUserMail: (state, action) => {
      state.email = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },

    setLastFile: (state, action) => {
      state.lastFile = action.payload;
    },
  },
});

export const {
  onboardUser,
  setUserMail,
  setDepartment,
  setFullName,
  setRole,
  setLastFile,
} = userSlice.actions;

export default userSlice.reducer;
