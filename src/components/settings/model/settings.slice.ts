import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { i18n } from '../../../app/i18n.ts';

type SettingsState = {
  theme: 'system' | 'light' | 'dark';
  language: 'eng' | 'rus';
  settingsIsActive: boolean;
};

const initialState: SettingsState = {
  theme: (localStorage.getItem('app-theme') as 'system' | 'light' | 'dark') || 'system',
  language: (localStorage.getItem('app-language') as 'eng' | 'rus') || 'eng',
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
      localStorage.setItem('app-theme', payload);
    },

    setLanguage(state, { payload }: PayloadAction<'eng' | 'rus'>) {
      state.language = payload;
      localStorage.setItem('app-language', payload);
      i18n.changeLanguage(payload === 'eng' ? 'en' : 'ru');
    },

    toggleSettings(state) {
      state.settingsIsActive = !state.settingsIsActive;
    },
  },
});

export const { selectTheme, selectLanguage, selectSettingsIsActive } = settingsSlice.selectors;
export const { setTheme, setLanguage, toggleSettings } = settingsSlice.actions;
