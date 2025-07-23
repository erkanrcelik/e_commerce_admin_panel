import { configureStore } from '@reduxjs/toolkit';

import appSlice from '@/features/app/appSlice';
import authSlice from '@/features/auth/authSlice';

/**
 * Redux store configuration
 *
 * Centralized state management for the admin panel application.
 * Combines auth and app slices with proper middleware configuration.
 */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    app: appSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

/**
 * Root state type for TypeScript
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * App dispatch type for TypeScript
 */
export type AppDispatch = typeof store.dispatch;
