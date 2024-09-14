import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from './layout/baseLayout.tsx';
import { ErrorPage } from '../pages/error/error.page.tsx';
import { MainPage } from '../pages/main/main.page.tsx';
import { AuthLayout } from '../pages/auth/auth.page.tsx';
import { Signup } from '../components/auth/signup.tsx';
import { routes } from '../shared/routes/routes.ts';
import { Signin } from '../components/auth/signin.tsx';
import { RequireAuthGuard, RequireGuestGuard } from './requireAuthGuard.tsx';

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
              path: routes.SIGNUP_PAGE,
              element: (
                <RequireGuestGuard>
                  <Signup />
                </RequireGuestGuard>
              ),
            },
            {
              path: routes.SIGNIN_PAGE,
              element: (
                <RequireGuestGuard>
                  <Signin />
                </RequireGuestGuard>
              ),
            },
          ],
        },
      ],
    },
  ]);
