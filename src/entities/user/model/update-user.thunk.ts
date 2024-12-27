import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { userService } from 'shared/api/user.service.ts';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from 'entities/user/model/user.slice.ts';
import { ErrorResponse, User } from 'shared/types/types.ts';

export const updateUserRequest = createAsyncAction({
  actionType: 'user/update',
  method: userService.updateUser,
});

export const updateUserPending: CaseReducer<UserState> = (state) => {
  state.userFetchStatus = 'loading';
  state.error = null;
};

export const updateUserFulfilled: CaseReducer<UserState, PayloadAction<User>> = (state, action) => {
  state.userFetchStatus = 'succeeded';
  state.user = action.payload;
  state.error = null;
};

export const updateUserRejected: CaseReducer<UserState> = (state, action) => {
  state.userFetchStatus = 'failed';
  state.error = action.payload as ErrorResponse;
};
