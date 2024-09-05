import { useLayoutEffect, useState } from 'react';

const DARK = 'dark';
const LIGHT = 'light';

export function useTheme(themePreference: 'system' | 'light' | 'dark') {
  const preferTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  const [theme, setTheme] = useState(themePreference === 'system' ? preferTheme : themePreference);

  useLayoutEffect(() => {
    let mediaQuery: MediaQueryList;
    let handleChange: () => void;

    if (themePreference === 'system') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      handleChange = () => {
        setTheme(mediaQuery.matches ? DARK : LIGHT);
      };

      handleChange();
      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    } else {
      setTheme(themePreference);
    }
  }, [themePreference]);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
