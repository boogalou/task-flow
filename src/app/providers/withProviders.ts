import compose from 'compose-function';
import { withI18nextProvider } from './withI18nextProvider.tsx';
import { withReduxProvider } from './withReduxProvider.tsx';
import { withAuthProvider } from './withAuthProvider.tsx';
import { withThemeProvider } from './withThemeProvider.tsx';

export const withProviders = compose(
  withReduxProvider,
  withI18nextProvider,
  withThemeProvider,
  withAuthProvider,
);
