import { JSX } from 'react';
import { ThemeProvider } from './themeProvider.tsx';

export const withThemeProvider = (component: () => JSX.Element) => () => (
  <ThemeProvider>{component()}</ThemeProvider>
);
