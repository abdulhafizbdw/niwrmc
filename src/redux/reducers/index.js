import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import { api } from '../api';
import currentFileSlice from '../slices/currentFileSlice';
import currentProjectSlice from '../slices/currentProjectSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  currentFile: currentFileSlice,
  currentProject: currentProjectSlice,
  [api.reducerPath]: api.reducer,
});
