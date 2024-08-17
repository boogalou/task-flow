import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskData } from './types.ts';
import { taskApi } from '../api/TaskApi.ts';
import axios from 'axios';

export const crateTaskRequest = createAsyncThunk(
  'task/create',
  async (data: TaskData, thunkApi) => {
    try {
      const response = await taskApi.createTask(data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    }
  },
);
