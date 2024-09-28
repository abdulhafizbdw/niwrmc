import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onboarded: false,
  email: '',
  password: '',
  token: '',
  department: [],
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
  },
});

export const { onboardUser, setUserMail, setDepartment } = userSlice.actions;

export default userSlice.reducer;
