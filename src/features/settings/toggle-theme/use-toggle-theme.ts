import { useTranslation } from 'react-i18next';
import { selectedTheme } from 'entities/settings';
import { ChangeEvent } from 'react';
import { setTheme } from 'entities/settings/model/settings.slice.ts';
import { useAppDispatch } from 'shared/lib/reduxHooks.ts';

export function useToggleTheme() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const currentTheme = selectedTheme();

  const handleThemeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newTheme = evt.target.value as 'system' | 'light' | 'dark';
    dispatch(setTheme(newTheme));
  };

  return {
    handleThemeChange,
    currentTheme,
    t,
  };
}
