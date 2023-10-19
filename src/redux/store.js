import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
