import { ReactNode } from 'react';
import { useAppSelector } from '../../../shared/lib/reduxHooks.ts';
import { selectTheme } from '../../../components/settings/model/settings.slice.ts';
import { useTheme } from '../../../shared/lib/useTheme.ts';

export interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themePreference = useAppSelector(selectTheme);
  useTheme(themePreference);

  return children;
}
