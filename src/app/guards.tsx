import { ReactNode } from 'react';
import { useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectIsAuth } from 'entities/auth/model/auth.slice.ts';
import { Navigate } from 'react-router-dom';
import { routes } from 'shared/constants/routes.ts';

export function RequireAuthGuard({ children }: { children: ReactNode }) {
  const isAuth = useAppSelector(selectIsAuth);
  return !isAuth ? <Navigate to={routes.LOGIN_PAGE} /> : <>{children}</>;
}

export function RequireGuestGuard({ children }: { children: ReactNode }) {
  const isAuth = useAppSelector(selectIsAuth);
  return isAuth ? <Navigate to={routes.MAIN_PAGE} /> : <>{children}</>;
}
