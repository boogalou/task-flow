import axios from 'axios';
import { taskService } from 'shared/api/task.service.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from 'shared/types/types.ts';

export const updateTaskRequest = createAsyncThunk(
  'task/update',
  async (payload: Task, thunkApi) => {
    try {
      const response = await taskService.updateTask(payload);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
      throw new Error(`${err}`);
    }
  },
);

export const deleteTask = createAsyncThunk('task/delete', async (payload: number, thunkApi) => {
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
});
