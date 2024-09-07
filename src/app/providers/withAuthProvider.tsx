import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/reduxHooks.ts';
import { selectAuthFetchStatus } from '../../components/auth/model/auth.slice.ts';
import { checkAuthRequest } from '../../components/auth/model/auth.thunk.ts';

export interface AuthProviderProps {
  children: ReactElement;
}

function AuthProvider({ children }: AuthProviderProps) {
  const fetchStatus = useAppSelector(selectAuthFetchStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (isMounted) {
        dispatch(checkAuthRequest());
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

export const withAuthProvider = (component: () => JSX.Element) => () => (
  <AuthProvider>{component()}</AuthProvider>
);
