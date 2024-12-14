import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  updateSettingsFulfilled,
  updateSettingsPending,
  updateSettingsRejected,
  updateSettingsRequest,
} from './update-settings.thunk.ts';
import {
  getSettingsFulfilled,
  getSettingsPending,
  getSettingsRejected,
  getSettingsRequest,
} from 'entities/settings/model/get-settings.thunk.ts';
import { SettingsState } from 'entities/settings/types.ts';

const initialState: SettingsState = {
  settings: {
    theme: 'system',
    language: 'eng',
  },
  settingsIsActive: false,
  settingsFetchStatus: 'idle',
  error: null,
};

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,

  selectors: {
    selectTheme: (state) => state.settings.theme,
    selectLanguage: (state) => state.settings.language,
    selectSettingsIsActive: (state) => state.settingsIsActive,
  },

  reducers: {
    setTheme(state, { payload }: PayloadAction<'system' | 'light' | 'dark'>) {
      state.settings.theme = payload;
    },

    setLanguage(state, { payload }: PayloadAction<'eng' | 'rus'>) {
      state.settings.language = payload;
    },

    toggleSettings(state) {
      state.settingsIsActive = !state.settingsIsActive;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSettingsRequest.pending, getSettingsPending)
      .addCase(getSettingsRequest.fulfilled, getSettingsFulfilled)
      .addCase(getSettingsRequest.rejected, getSettingsRejected)
      .addCase(updateSettingsRequest.pending, updateSettingsPending)
      .addCase(updateSettingsRequest.fulfilled, updateSettingsFulfilled)
      .addCase(updateSettingsRequest.rejected, updateSettingsRejected);
  },
});

export const { selectTheme, selectLanguage, selectSettingsIsActive } = settingsSlice.selectors;
export const { setTheme, setLanguage, toggleSettings } = settingsSlice.actions;
