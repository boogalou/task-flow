import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { authService } from 'shared/api/auth.service.ts';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from 'entities/auth/model/auth.slice.ts';
import { ErrorResponse } from 'shared/types/types.ts';

export const logoutRequest = createAsyncAction({
  actionType: 'auth/logout',
  method: authService.logout,
});

export const handleLogoutRequestPending: CaseReducer<AuthState> = (state) => {
  state.authFetchStatus = 'loading';
  state.error = null;
};

export const handleLogoutRequestFulfilled: CaseReducer<AuthState, PayloadAction<void>> = (
  state,
) => {
  state.authFetchStatus = 'succeeded';
  state.authData = null;
  state.isAuth = false;
  state.error = null;
};

export const handleLogoutRequestRejected: CaseReducer<AuthState> = (state, action) => {
  state.authFetchStatus = 'failed';
  state.error = action.payload as ErrorResponse;
};
