import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskData } from './types.ts';
import { taskApi } from '../api/TaskApi.ts';
import axios from 'axios';

export const crateTaskRequest = createAsyncThunk(
  'task/create',
  async (payload: TaskData & { isCompleted: boolean }, thunkApi) => {
    try {
      const response = await taskApi.createTask(payload);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
      throw new Error(`${err}`);
    }
  },
);

export const updateTaskRequest = createAsyncThunk(
  'task/update',
  async (payload: Partial<TaskData & { id: number; isCompleted: boolean }>, thunkApi) => {
    try {
      const response = await taskApi.updateTask(payload);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
      throw new Error(`${err}`);
    }
  },
);

export const getTasks = createAsyncThunk('task/getAll', async (_payload: void, thunkApi) => {
  try {
    const response = await taskApi.getTasks();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
    throw new Error(`${err}`);
  }
});

export const deleteTask = createAsyncThunk('task/delete', async (payload: number, thunkApi) => {
  try {
    const response = await taskApi.deleteTask(payload);
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
