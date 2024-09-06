import { ReactNode } from 'react';
import { useTheme } from '../../shared/lib/useTheme.ts';
import { selectTheme } from '../../components/settings/model/settings.slice.ts';
import { useAppSelector } from '../store/reduxHooks.ts';

export interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themePreference = useAppSelector(selectTheme);
  useTheme(themePreference);

  return children;
}
