import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/reduxHooks.ts';
import { selectAuthFetchStatus } from '../../components/auth/model/auth.slice.ts';
import { checkAuthRequest } from '../../components/auth/model/auth.thunk.ts';

export interface AuthProviderProps {
  children: ReactElement;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const fetchStatus = useAppSelector(selectAuthFetchStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      dispatch(checkAuthRequest());
    })();
  }, []);

  if (fetchStatus === 'loading') {
    return <div>Loding</div>;
  }

  return children;
}
