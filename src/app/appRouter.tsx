import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from './layout/baseLayout.tsx';
import { ErrorPage } from '../pages/error/error.page.tsx';
import { MainPage } from 'pages/main/ui/main.page.tsx';
import { AuthLayout } from '../pages/auth/auth.page.tsx';
import { Registration } from 'features/auth/ui/registration.tsx';
import { routes } from '../shared/constants/routes.ts';
import { Login } from 'features/auth/ui/login.tsx';
import { RequireAuthGuard, RequireGuestGuard } from './guards.tsx';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: routes.MAIN_PAGE,
          element: (
            <RequireAuthGuard>
              <MainPage />
            </RequireAuthGuard>
          ),
        },
        {
          element: <AuthLayout />,
          children: [
            {
              path: routes.REGISTRATION_PAGE,
              element: (
                <RequireGuestGuard>
                  <Registration />
                </RequireGuestGuard>
              ),
            },
            {
              path: routes.LOGIN_PAGE,
              element: (
                <RequireGuestGuard>
                  <Login />
                </RequireGuestGuard>
              ),
            },
          ],
        },
      ],
    },
  ]);
