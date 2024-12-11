import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from 'entities/auth';
import { taskSlice } from 'entities/task/model/taskSlice.ts';
import { settingsSlice } from '../../components/settings/model/settings.slice.ts';
import { userSlice } from 'entities/user';

export const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  authSlice: authSlice.reducer,
  taskSlice: taskSlice.reducer,
  settingsSlice: settingsSlice.reducer,
});
