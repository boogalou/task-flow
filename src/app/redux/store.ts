import { configureStore } from '@reduxjs/toolkit';
import { reduxLogger } from './reduxLogger.ts';
import { rootReducer } from './rootReducer.ts';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(reduxLogger),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
