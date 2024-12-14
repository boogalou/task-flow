import { ReactNode } from 'react';
import { useAppSelector } from '../../../shared/lib/reduxHooks.ts';
import { selectTheme } from 'entities/settings/model/settings.slice.ts';
import { useTheme } from '../../../shared/lib/use-theme.ts';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themePreference = useAppSelector(selectTheme);
  useTheme(themePreference);

  return children;
}
