import axios from 'axios';
import { CaseReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { taskService } from 'shared/api/task.service.ts';
import { TaskState } from 'entities/task/types.ts';
import { getUniqueCategories } from 'entities/task/lib/getUniqueCategories.ts';
import { ErrorResponse } from 'shared/types/types.ts';

export const deleteTaskRequest = createAsyncThunk(
  'task/delete',
  async (payload: number, thunkApi) => {
    try {
      await taskService.deleteTask(payload);
      return payload;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
      throw new Error(`${err}`);
    }
  },
);

export const deleteTaskPending: CaseReducer<TaskState> = (state) => {
  state.taskFetchStatus = 'loading';
  state.error = null;
};

export const deleteTaskFulfilled: CaseReducer<TaskState, PayloadAction<number>> = (
  state,
  action: PayloadAction<number>,
) => {
  state.taskFetchStatus = 'succeeded';
  state.tasks = state.tasks.filter((task) => task.id !== action.payload);
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
