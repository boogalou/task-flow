import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkAuthRequest, logoutRequest, loginRequest, signupRequest } from './auth.thunk.ts';
import { AuthDataResponse, ErrorResponse, FetchStatus } from '../../../shared/types/types.ts';

export interface AuthState {
  authData: AuthDataResponse | null;
  authFetchStatus: FetchStatus;
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
  reducers: {
    setAuthData(state, { payload }: PayloadAction<AuthDataResponse>) {
      state.authData = payload;
    },
  },

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
      .addCase(loginRequest.pending, (state) => {
        state.authFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.authFetchStatus = 'succeeded';
        state.authData = action.payload || null;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.authFetchStatus = 'failed';
        state.isAuth = false;
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
        state.isAuth = false;
        state.error = action.payload as ErrorResponse;
      })
      .addCase(logoutRequest.pending, (state) => {
        state.authFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(logoutRequest.fulfilled, (state) => {
        state.authFetchStatus = 'succeeded';
        state.authData = null;
        state.isAuth = false;
        state.error = null;
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        state.authFetchStatus = 'failed';
        state.error = action.payload as ErrorResponse;
      });
  },
});

export const { selectAuthData, selectAuthFetchStatus, selectIsAuth } = authSlice.selectors;
export const { setAuthData } = authSlice.actions;
