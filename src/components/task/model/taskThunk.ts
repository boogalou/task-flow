import axios from 'axios';
import { taskService } from '../service/TaskService.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateTaskRequest, Task } from '../../../shared/types/types.ts';
import { AppState } from '../../../app/store/store.ts';

export const createTaskRequest = createAsyncThunk(
  'task/create',
  async (payload: CreateTaskRequest, thunkApi) => {
    try {
      const response = await taskService.createTask(payload);
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
  async (payload: Task, thunkApi) => {
    const store = thunkApi.getState() as AppState;
    const userId = store.authSlice.authData?.id;

    try {
      const response = await taskService.updateTask(payload, userId!);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
      throw new Error(`${err}`);
    }
  },
);

export const getTasks = createAsyncThunk('task/getAll', async (userId: number, thunkApi) => {
  try {
    const response = await taskService.getTasks(userId);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
    throw new Error(`${err}`);
  }
});

export const deleteTask = createAsyncThunk('task/delete', async (payload: number, thunkApi) => {
  const store = thunkApi.getState() as AppState;
  const userId = store.authSlice.authData?.id;

  try {
    const response = await taskService.deleteTask(payload, userId!);
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
