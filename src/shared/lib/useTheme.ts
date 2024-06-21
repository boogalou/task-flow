import { useLayoutEffect, useState } from 'react';

const DARK = 'dark';
const LIGHT = 'light';

export function useTheme() {
  const preferTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || preferTheme);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setTheme(mediaQuery.matches ? DARK : LIGHT);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
