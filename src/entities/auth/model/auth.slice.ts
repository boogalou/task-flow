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
import { registrationRequest } from 'entities/auth';
import {
  handleRegistrationFulfilled,
  handleRegistrationPending,
  handleRegistrationRejected,
} from 'entities/auth/model/registration.thunk.ts';

export type AuthState = {
  authData: AuthResponse | null;
  authFetchStatus: FetchStatus;
  error: ErrorResponse | null;
  isAuth: boolean;
  isRegister: boolean;
};

const initialState: AuthState = {
  authData: null,
  authFetchStatus: 'idle',
  error: null,
  isAuth: false,
  isRegister: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  selectors: {
    selectAuthData: (state) => state.authData,
    selectAuthFetchStatus: (state) => state.authFetchStatus,
    selectIsAuth: (state) => state.isAuth,
    selectIsRegister: (state) => state.isRegister,
  },
  reducers: {
    setAuthData(state, { payload }: PayloadAction<AuthResponse>) {
      state.authData = payload;
    },

    clearRegister(state) {
      state.isRegister = false;
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
      .addCase(logoutRequest.rejected, handleLogoutRequestRejected)
      .addCase(registrationRequest.pending, handleRegistrationPending)
      .addCase(registrationRequest.fulfilled, handleRegistrationFulfilled)
      .addCase(registrationRequest.rejected, handleRegistrationRejected);
  },
});

export const { selectAuthData, selectAuthFetchStatus, selectIsAuth, selectIsRegister } =
  authSlice.selectors;
export const { setAuthData, clearRegister } = authSlice.actions;
