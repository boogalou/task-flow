import './index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';
import { withProviders } from './providers/withProviders.ts';
import { setupInterceptors } from 'shared/api/_base-api.ts';
import { store } from './store/store.ts';

export async function appInit() {
  const AppWithProviders = withProviders(() => <RouterProvider router={appRouter()} />);
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<AppWithProviders />);
}

await appInit();

setupInterceptors(store);
