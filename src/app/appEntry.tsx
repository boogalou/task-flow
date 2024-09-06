import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';
import { store } from './store/store.ts';
import { ThemeProvider } from './providers/themeProvider.tsx';
import { AuthProvider } from './providers/authProvider.tsx';
import { setupInterceptors } from '../shared/lib/axiosSettings.ts';
import { I18nextProvider } from 'react-i18next';
import { i18n } from './i18n.ts';

export async function appInit() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ReduxProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <AuthProvider>
            <RouterProvider router={appRouter()} />
          </AuthProvider>
        </ThemeProvider>
      </I18nextProvider>
    </ReduxProvider>,
  );
}

appInit();

setupInterceptors(store);
