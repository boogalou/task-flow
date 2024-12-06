import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSettingsRequest, updateSettingsRequest } from './settingsThunk.ts';
import { ErrorResponse, FetchStatus, UserSettings } from '../../../shared/types/types.ts';

type SettingsState = {
  settings: UserSettings;
  settingsIsActive: boolean;
  settingsFetchStatus: FetchStatus;
  error: ErrorResponse | null;
};

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
      .addCase(getSettingsRequest.pending, (state) => {
        state.settingsFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(getSettingsRequest.fulfilled, (state, action) => {
        state.settingsFetchStatus = 'succeeded';
        state.settings = action.payload;
        state.error = null;
      })
      .addCase(getSettingsRequest.rejected, (state, action) => {
        state.settingsFetchStatus = 'failed';
        state.error = action.payload as ErrorResponse;
      })
      .addCase(updateSettingsRequest.pending, (state) => {
        state.settingsFetchStatus = 'loading';
        state.error = null;
      })
      .addCase(updateSettingsRequest.fulfilled, (state, action) => {
        state.settingsFetchStatus = 'succeeded';
        state.settings = action.payload;
        state.error = null;
      })
      .addCase(updateSettingsRequest.rejected, (state, action) => {
        state.settingsFetchStatus = 'failed';
        state.error = action.payload as ErrorResponse;
      });
  },
});

export const { selectTheme, selectLanguage, selectSettingsIsActive } = settingsSlice.selectors;
export const { setTheme, setLanguage, toggleSettings } = settingsSlice.actions;
