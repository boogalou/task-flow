import { createSlice } from '@reduxjs/toolkit';
import { signinRequest, signupRequest } from './auth.thunk.ts';

export interface AuthState {
  authData: any;
  isAuth: boolean;
  authFetchStatus: string;
  error: string | null;
}

const initialState: AuthState = {
  authData: {},
  isAuth: false,
  authFetchStatus: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signupRequest.pending, (state) => {
        state.authFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(signupRequest.fulfilled, (state, action) => {
        state.authFetchStatus = 'succeeded';
        state.authData = action.payload;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(signupRequest.rejected, (state, action) => {
        state.authFetchStatus = 'failed';
        state.error = action.payload as string;
      })
      .addCase(signinRequest.pending, (state) => {
        state.authFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(signinRequest.fulfilled, (state, action) => {
        state.authFetchStatus = 'succeeded';
        state.authData = action.payload;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(signinRequest.rejected, (state, action) => {
        state.authFetchStatus = 'failed';
        state.error = action.payload as string;
      });
  },
});
