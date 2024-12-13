import axios from 'axios';
import { CaseReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from 'shared/api/task.service.ts';
import { TaskState } from 'entities/task/model/taskSlice.ts';
import { getUniqueCategories } from 'entities/task/lib/getUniqueCategories.ts';
import { ErrorResponse } from 'shared/types/types.ts';

export const deleteTaskRequest = createAsyncThunk(
  'task/delete',
  async (payload: number, thunkApi) => {
    try {
      const response = await taskService.deleteTask(payload);
      if (response.status === 204) {
        return { payload };
      } else {
        return undefined;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
      throw new Error(`${err}`);
    }
  },
);

export const deleteTaskPending: CaseReducer<TaskState> = (state, action) => {
  state.taskFetchStatus = 'loading';
  state.error = null;
  state.lastRemovedTask = state.tasks.find((task) => task.id === action.meta.arg) || null;
  state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg);
};

export const deleteTaskFulfilled: CaseReducer<TaskState> = (state) => {
  state.taskFetchStatus = 'succeeded';
  state.lastRemovedTask = null;
  state.categories = getUniqueCategories(state.tasks);
  state.error = null;
};

export const deleteTaskRejected: CaseReducer<TaskState> = (state, action) => {
  state.taskFetchStatus = 'failed';
  if (state.lastRemovedTask) {
    state.tasks.push(state.lastRemovedTask);
    state.lastRemovedTask = null;
  }
  state.error = action.payload as ErrorResponse;
};
