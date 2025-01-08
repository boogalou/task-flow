import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { userService } from 'shared/api/user.service.ts';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from 'entities/user/model/user.slice.ts';
import { ErrorResponse, User } from 'shared/types/types.ts';

export const updateUserAvatarRequest = createAsyncAction({
  actionType: 'user/update-avatar',
  method: userService.updateUserAvatar,
});

export const updateUserAvatarPending: CaseReducer<UserState> = (state) => {
  state.userFetchStatus = 'loading';
  state.error = null;
};

export const updateUserAvatarFulfilled: CaseReducer<UserState, PayloadAction<User>> = (
  state,
  action,
) => {
  state.userFetchStatus = 'succeeded';
  state.user = action.payload;
  state.error = null;
};

export const updateUserAvatarRejected: CaseReducer<UserState> = (state, action) => {
  state.userFetchStatus = 'failed';
  state.error = action.payload as ErrorResponse;
};
