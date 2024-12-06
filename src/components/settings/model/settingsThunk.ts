import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../../../app/store/store.ts';
import axios from 'axios';
import { settingsService } from '../service/SettingsService.ts';
import { UserSettings } from '../../../shared/types/types.ts';

export const getSettingsRequest = createAsyncThunk('settings/get', async (_, thunkApi) => {
  const store = thunkApi.getState() as AppState;
  const userId = store.authSlice.authData?.id;

  try {
    const response = await settingsService.getSettings(userId!);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
    throw new Error(`${err}`);
  }
});

export const updateSettingsRequest = createAsyncThunk(
  'settings/update',
  async (payload: UserSettings, thunkApi) => {
    const store = thunkApi.getState() as AppState;
    const userId = store.authSlice.authData?.id;

    try {
      const response = await settingsService.updateSettings(payload, userId!);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkApi.rejectWithValue(err.response?.data);
      }
      throw new Error(`${err}`);
    }
  },
);
