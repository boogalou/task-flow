import { authApi } from '../api/AuthApi.ts';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequestData, RegistrationRequestData } from '../../../shared/types/types.ts';
import { fetchTasks } from '../../task/model/taskSlice.ts';

export const signupRequest = createAsyncThunk(
  'auth/signup',
  async (data: RegistrationRequestData, thunkApi) => {
    try {
      const response = await authApi.signup(data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    }
  },
);

export const signinRequest = createAsyncThunk(
  'auth/signin',
  async (data: LoginRequestData, thunkApi) => {
    try {
      const response = await authApi.signin(data);
      await thunkApi.dispatch(fetchTasks());
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    }
  },
);

export const checkAuthRequest = createAsyncThunk(
  'auth/refresh',
  async (_payload: void, thunkApi) => {
    try {
      const response = await authApi.checkAuth();
      await thunkApi.dispatch(fetchTasks());
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    }
  },
);

export const logoutRequest = createAsyncThunk('auth/logout', async (_data, thunkApi) => {
  try {
    const response = await authApi.checkAuth();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
  }
});
