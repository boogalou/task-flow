import { I18nextProvider } from 'react-i18next';
import { i18n } from '../i18n.ts';

export const withI18nextProvider = (component: () => JSX.Element) => () => (
  <I18nextProvider i18n={i18n}>{component()}</I18nextProvider>
);
