/* eslint-disable react-hooks/rules-of-hooks */

import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectLanguage, selectTheme, selectSettingsIsActive } from './settings.slice.ts';

export function themeSelector() {
  return useAppSelector(selectTheme);
}

export function langSelector() {
  return useAppSelector(selectLanguage);
}

export function settingsIsActiveSelector() {
  return useAppSelector(selectSettingsIsActive);
}
