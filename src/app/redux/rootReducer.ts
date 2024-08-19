import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from '../../components/auth/model/auth.slice.ts';
import { taskSlice } from '../../components/task/model/taskSlice.ts';
import { modalSlice } from '../../shared/ui-kit/modal/model/modalSlice.ts';

export const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  taskSlice: taskSlice.reducer,
  modalSlice: modalSlice.reducer,
});
