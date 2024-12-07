import { SettingsProvider } from './settingsProvider.tsx';

export const withSettingsProvider = (component: () => JSX.Element) => () => (
  <SettingsProvider>{component()}</SettingsProvider>
);
