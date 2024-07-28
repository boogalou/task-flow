import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from './layout/baseLayout.tsx';
import { ErrorPage } from '../pages/error/error.page.tsx';
import { MainPage } from '../pages/main/main.page.tsx';
import { AuthLayout } from '../pages/auth/auth.page.tsx';
import { Signup } from '../components/auth/signup.tsx';
import { routes } from '../shared/routes/routes.ts';
import { Signin } from '../components/auth/signin.tsx';
import { Today } from '../components/today/today.tsx';
import { Week } from '../components/week/week.tsx';
import { AllTasks } from '../components/tassks-all/allTasks.tsx';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: routes.MAIN_PAGE,
          element: <MainPage />,
          children: [
            {
              path: routes.TODAY_PAGE,
              element: <Today />,
            },
            {
              path: routes.WEEK_PAGE,
              element: <Week />,
            },
            {
              path: routes.ALL_PAGE,
              element: <AllTasks />,
            },
          ],
        },
        {
          element: <AuthLayout />,
          children: [
            {
              element: <Signup />,
              path: routes.SIGNUP_PAGE,
            },
            {
              element: <Signin />,
              path: routes.SIGNIN_PAGE,
            },
          ],
        },
      ],
    },
  ]);
