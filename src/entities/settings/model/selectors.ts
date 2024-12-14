import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectLanguage, selectTheme } from './settings.slice.ts';

export function selectedTheme() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAppSelector(selectTheme);
}

export function selectLang() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAppSelector(selectLanguage);
}
