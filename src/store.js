import { configureStore } from '@reduxjs/toolkit';
import { loginSliceApi } from './slices/login/loginSliceApi';
import { uploadApiSlice } from './slices/uploadResume/uploadApiSlice'; // Make sure this path is correct

export const store = configureStore({
  reducer: {
    [loginSliceApi.reducerPath]: loginSliceApi.reducer,
    [uploadApiSlice.reducerPath]: uploadApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginSliceApi.middleware,
      uploadApiSlice.middleware
    ),
});