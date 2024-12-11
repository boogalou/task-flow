import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { authService } from 'shared/api/auth.service.ts';
import { AuthResponse, ErrorResponse } from 'shared/types/types.ts';
import { AuthState } from 'entities/auth/model/auth.slice.ts';

export const loginRequest = createAsyncAction({
  actionType: 'auth/login',
  method: authService.login,
});

export const handleLoginPending: CaseReducer<AuthState> = (state) => {
  state.authFetchStatus = 'loading';
  state.error = null;
};

export const handleLoginFulfilled: CaseReducer<AuthState, PayloadAction<AuthResponse>> = (
  state,
  action,
) => {
  state.authFetchStatus = 'succeeded';
  state.authData = action.payload || null;
  state.isAuth = true;
  state.error = null;
};

export const handleLoginRejected: CaseReducer<AuthState> = (state, action) => {
  state.authFetchStatus = 'failed';
  state.isAuth = false;
  state.error = action.payload as ErrorResponse;
};
