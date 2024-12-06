import compose from 'compose-function';
import { withI18nextProvider } from './I18NextProvider/withI18nextProvider.tsx';
import { withReduxProvider } from './reduxProvider/withReduxProvider.tsx';
import { withThemeProvider } from './themeProvider/withThemeProvider.tsx';
import { withAuthProvider } from './authProvider/withAuthProvider.tsx';

export const withProviders = compose(
  withReduxProvider,
  withI18nextProvider,
  withThemeProvider,
  withAuthProvider,
);
