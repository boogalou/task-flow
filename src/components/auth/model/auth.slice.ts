import { createSlice } from '@reduxjs/toolkit';
import { checkAuthRequest, signinRequest, signupRequest } from './auth.thunk.ts';
import { AuthDataResponse, ErrorResponse } from '../../../shared/types/types.ts';

export interface AuthState {
  authData: AuthDataResponse | null;
  authFetchStatus: string;
  error: ErrorResponse | null;
  isAuth: boolean;
}

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
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signupRequest.pending, (state) => {
        state.authFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(signupRequest.fulfilled, (state, action) => {
        state.authFetchStatus = 'succeeded';
        state.authData = action.payload || null;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(signupRequest.rejected, (state, action) => {
        state.authFetchStatus = 'failed';
        state.error = action.payload as ErrorResponse;
      })
      .addCase(signinRequest.pending, (state) => {
        state.authFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(signinRequest.fulfilled, (state, action) => {
        state.authFetchStatus = 'succeeded';
        state.authData = action.payload || null;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(signinRequest.rejected, (state, action) => {
        state.authFetchStatus = 'failed';
        state.error = action.payload as ErrorResponse;
      })
      .addCase(checkAuthRequest.pending, (state) => {
        state.authFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(checkAuthRequest.fulfilled, (state, action) => {
        state.authFetchStatus = 'succeeded';
        state.authData = action.payload || null;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(checkAuthRequest.rejected, (state, action) => {
        state.authFetchStatus = 'failed';
        state.error = action.payload as ErrorResponse;
      });
  },
});

export const { selectAuthData, selectAuthFetchStatus, selectIsAuth } = authSlice.selectors;
