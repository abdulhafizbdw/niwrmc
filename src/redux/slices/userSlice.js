import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onboarded: false,
  email: '',
  password: '',
  token: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    onboardUser: (state) => {
      state.onboarded = true;
    },
  },
});

export const { onboardUser } = userSlice.actions;

export default userSlice.reducer;
