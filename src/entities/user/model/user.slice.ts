import { ErrorResponse, FetchStatus, User } from 'shared/types/types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { getUserRequest } from 'entities/user';
import {
  getUserFulfilled,
  getUserPending,
  getUserRejected,
} from 'entities/user/model/get-user.thunk.ts';
import {
  updateUserFulfilled,
  updateUserPending,
  updateUserRejected,
  updateUserRequest,
} from 'entities/user/model/update-user.thunk.ts';
import {
  updateUserAvatarFulfilled,
  updateUserAvatarPending,
  updateUserAvatarRejected,
  updateUserAvatarRequest,
} from 'entities/user/model/update-avatar.thunk.ts';

export type UserState = {
  user: User | null;
  userFetchStatus: FetchStatus;
  error: ErrorResponse | null;
};

const initialState: UserState = {
  user: null,
  userFetchStatus: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  selectors: {
    selectUser: (state) => state.user,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserRequest.pending, getUserPending)
      .addCase(getUserRequest.fulfilled, getUserFulfilled)
      .addCase(getUserRequest.rejected, getUserRejected)
      .addCase(updateUserRequest.pending, updateUserPending)
      .addCase(updateUserRequest.fulfilled, updateUserFulfilled)
      .addCase(updateUserRequest.rejected, updateUserRejected)
      .addCase(updateUserAvatarRequest.pending, updateUserAvatarPending)
      .addCase(updateUserAvatarRequest.fulfilled, updateUserAvatarFulfilled)
      .addCase(updateUserAvatarRequest.rejected, updateUserAvatarRejected);
  },
});

export const { selectUser } = userSlice.selectors;
