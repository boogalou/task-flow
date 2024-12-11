import { ErrorResponse, FetchStatus, User } from '../../../shared/types/types.ts';
import { createSlice } from '@reduxjs/toolkit';

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
});

export const { selectUser } = userSlice.selectors;
export const {} = userSlice.actions;
