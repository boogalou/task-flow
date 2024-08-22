import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';
import { store } from './redux/store.ts';
import { ThemeProvider } from './themeProvider.tsx';
import { AuthProvider } from './AuthProvider.tsx';

export async function appInit() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ReduxProvider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={appRouter()} />
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>,
  );
}

await appInit();
