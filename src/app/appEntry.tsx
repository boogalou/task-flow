import './index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './appRouter';
import { store } from './store/store.ts';
import { setupInterceptors } from '../shared/lib/axiosSettings.ts';
import { withProviders } from './providers/withProviders.ts';

export async function appInit() {
  const AppWithProviders = withProviders(() => <RouterProvider router={appRouter()} />);
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<AppWithProviders />);
}

appInit();

setupInterceptors(store);
