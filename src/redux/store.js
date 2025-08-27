import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import ngoReducer from './ngoSlice';
import requirementReducer from './requirementSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ngo: ngoReducer,
    requirement: requirementReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
