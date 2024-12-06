import { authService } from '../service/AuthService.ts';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequestData, RegistrationRequestData } from '../../../shared/types/types.ts';

export const signupRequest = createAsyncThunk(
  'auth/signup',
  async (data: RegistrationRequestData, thunkApi) => {
    try {
      const response = await authService.signup(data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    }
  },
);

export const loginRequest = createAsyncThunk(
  'auth/login',
  async (data: LoginRequestData, thunkApi) => {
    try {
      const response = await authService.login(data);
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
      const response = await authService.checkAuth();
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
    const response = await authService.logout();
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
  }
});
