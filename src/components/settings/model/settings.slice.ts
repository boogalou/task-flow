import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  theme: 'system' | 'light' | 'dark';
  language: 'eng' | 'rus';
  settingsIsActive: boolean;
};

const initialState: SettingsState = {
  theme: 'system',
  language: 'eng',
  settingsIsActive: false,
};

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,

  selectors: {
    selectTheme: (state) => state.theme,
    selectLanguage: (state) => state.language,
    selectSettingsIsActive: (state) => state.settingsIsActive,
  },

  reducers: {
    setTheme(state, { payload }: PayloadAction<'system' | 'light' | 'dark'>) {
      state.theme = payload;
    },

    setLanguage(state, { payload }: PayloadAction<'eng' | 'rus'>) {
      state.language = payload;
    },

    toggleSettings(state) {
      state.settingsIsActive = !state.settingsIsActive;
    },
  },
});

export const { selectTheme, selectLanguage, selectSettingsIsActive } = settingsSlice.selectors;
export const { setTheme, setLanguage, toggleSettings } = settingsSlice.actions;
