import { ReactNode } from 'react';
import { useTheme } from '../shared/lib/useTheme.ts';

export interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useTheme();
  return children;
}
