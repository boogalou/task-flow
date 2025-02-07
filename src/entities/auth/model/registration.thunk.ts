import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { authService } from 'shared/api/auth.service.ts';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from 'entities/auth/model/auth.slice.ts';
import { AuthResponse } from 'shared/types/types.ts';

export const registrationRequest = createAsyncAction({
  actionType: 'auth/registration',
  method: authService.registration,
});

export const handleRegistrationPending: CaseReducer<AuthState> = (state) => {
  state.authFetchStatus = 'loading';
  state.error = null;
};

export const handleRegistrationFulfilled: CaseReducer<AuthState, PayloadAction<AuthResponse>> = (
  state,
) => {
  state.authFetchStatus = 'loading';
  state.error = null;
};
