/* eslint-disable react-hooks/rules-of-hooks */

import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectLanguage, selectTheme } from './settings.slice.ts';

export function selectedTheme() {
  return useAppSelector(selectTheme);
}

export function selectLang() {
  return useAppSelector(selectLanguage);
}
