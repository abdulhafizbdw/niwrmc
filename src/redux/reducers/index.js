import {combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import {api} from '../api';

export const rootReducer = combineReducers({
  user: userSlice,
  [api.reducerPath]: api.reducer,
});
