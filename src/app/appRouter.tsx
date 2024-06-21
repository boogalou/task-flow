import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "../shared/ui-kit/layout/baseLayout.tsx";
import { ErrorPage } from "../pages/error/error.page.tsx";
import { MainPage } from "../pages/main/main.page.tsx";
import { AuthLayout } from "../pages/auth/auth.page.tsx";
import { Signup } from "../components/auth/signup/signup.tsx";
import { routes } from "../shared/routes/routes.ts";
import { Signin } from "../components/auth/signin/signin.tsx";


export const appRouter = () => createBrowserRouter([
  {
    element: <BaseLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: routes.MAIN_PAGE,
        element: <MainPage/>
      },
      {
        element: <AuthLayout/>,
        children: [
          {
            element: <Signup/>,
            path: routes.SIGNUP_PAGE
          },
          {
            element: <Signin/>,
            path: routes.SIGNIN_PAGE
          }
        ]
      }
    ]
  }
])