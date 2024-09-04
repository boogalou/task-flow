import { useLayoutEffect, useState } from 'react';

const DARK = 'dark';
const LIGHT = 'light';

export function useTheme(themePreference: 'system' | 'light' | 'dark') {
  const preferTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;

  const [theme, setTheme] = useState(themePreference === 'system' ? preferTheme : themePreference);

  useLayoutEffect(() => {
    if (themePreference === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        setTheme(mediaQuery.matches ? DARK : LIGHT);
      };

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
