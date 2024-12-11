import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, ErrorResponse, FetchStatus } from '../../../shared/types/types.ts';
import {
  handleLoginPending,
  handleLoginRejected,
  handleLoginFulfilled,
  loginRequest,
} from 'entities/auth/model/login.thunk.ts';
import {
  checkAuthRequest,
  handleCheckAuthFulfilled,
  handleCheckAuthPending,
  handleCheckAuthRejected,
} from 'entities/auth/model/check-auth.thunk.ts';
import {
  logoutRequest,
  handleLogoutRequestFulfilled,
  handleLogoutRequestPending,
  handleLogoutRequestRejected,
} from 'entities/auth/model/logout.thunk.ts';

export type AuthState = {
  authData: AuthResponse | null;
  authFetchStatus: FetchStatus;
  error: ErrorResponse | null;
  isAuth: boolean;
};

const initialState: AuthState = {
  authData: null,
  authFetchStatus: 'idle',
  error: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  selectors: {
    selectAuthData: (state) => state.authData,
    selectAuthFetchStatus: (state) => state.authFetchStatus,
    selectIsAuth: (state) => state.isAuth,
  },
  reducers: {
    setAuthData(state, { payload }: PayloadAction<AuthResponse>) {
      state.authData = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, handleLoginPending)
      .addCase(loginRequest.fulfilled, handleLoginFulfilled)
      .addCase(loginRequest.rejected, handleLoginRejected)
      .addCase(checkAuthRequest.pending, handleCheckAuthPending)
      .addCase(checkAuthRequest.fulfilled, handleCheckAuthFulfilled)
      .addCase(checkAuthRequest.rejected, handleCheckAuthRejected)
      .addCase(logoutRequest.pending, handleLogoutRequestPending)
      .addCase(logoutRequest.fulfilled, handleLogoutRequestFulfilled)
      .addCase(logoutRequest.rejected, handleLogoutRequestRejected);
  },
});

export const { selectAuthData, selectAuthFetchStatus, selectIsAuth } = authSlice.selectors;
export const { setAuthData } = authSlice.actions;
