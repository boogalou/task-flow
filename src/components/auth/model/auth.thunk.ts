import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/AuthApi.ts';
import axios from 'axios';
import { LoginRequestData, RegistrationRequestData } from '../types.ts';

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
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
    }
  },
);
