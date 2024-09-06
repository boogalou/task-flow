import { ReactElement } from 'react';
import { useAppSelector } from './store/reduxHooks.ts';
import { selectIsAuth } from '../components/auth/model/auth.slice.ts';
import { Navigate } from 'react-router-dom';
import { routes } from '../shared/routes/routes.ts';

export interface AuthGuardProps {
  children: ReactElement;
}

export function AuthenticatedGuard({ children }: AuthGuardProps) {
  const isAuth = useAppSelector(selectIsAuth);
  return !isAuth ? <Navigate to={routes.SIGNIN_PAGE} /> : children;
}

export function UnauthenticatedGuard({ children }: AuthGuardProps) {
  const isAuth = useAppSelector(selectIsAuth);
  return isAuth ? <Navigate to={routes.MAIN_PAGE} /> : children;
}
