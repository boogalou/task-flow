import compose from 'compose-function';
import { withI18nextProvider } from './I18NextProvider/withI18nextProvider.tsx';
import { withReduxProvider } from './reduxProvider/withReduxProvider.tsx';
import { withThemeProvider } from './themeProvider/withThemeProvider.tsx';
import { withAuthProvider } from './authProvider/withAuthProvider.tsx';
import { withSettingsProvider } from './settingsProvider/withSettingsProvider.tsx';

export const withProviders = compose(
  withReduxProvider,
  withI18nextProvider,
  withThemeProvider,
  withAuthProvider,
  withSettingsProvider,
);
