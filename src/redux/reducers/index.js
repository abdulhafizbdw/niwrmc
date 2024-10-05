import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import { api } from '../api';
import currentFileSlice from '../slices/currentFileSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  currentFile: currentFileSlice,
  [api.reducerPath]: api.reducer,
});
