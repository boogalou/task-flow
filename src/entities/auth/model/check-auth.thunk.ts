import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { authService } from 'shared/api/auth.service.ts';
import { AuthState } from './auth.slice.ts';
import { AuthResponse, ErrorResponse } from 'shared/types/types.ts';

export const checkAuthRequest = createAsyncAction({
  actionType: 'auth/refresh',
  method: authService.checkAuth,
});

export const handleCheckAuthPending: CaseReducer<AuthState> = (state) => {
  state.authFetchStatus = 'loading';
  state.error = null;
};

export const handleCheckAuthFulfilled: CaseReducer<AuthState, PayloadAction<AuthResponse>> = (
  state,
  action,
) => {
  state.authFetchStatus = 'succeeded';
  state.authData = action.payload || null;
  state.error = null;
  state.isAuth = true;
};

export const handleCheckAuthRejected: CaseReducer<AuthState> = (state, action) => {
  state.authFetchStatus = 'failed';
  state.isAuth = false;
  state.error = action.payload as ErrorResponse;
};
