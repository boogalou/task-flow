import { memo, ReactElement, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/reduxHooks.ts';
import { selectAuthFetchStatus } from '../../../entities/auth/model/auth.slice.ts';
import { checkAuthRequest } from '../../../features/auth/usecases/auth.thunk.ts';

interface AuthProviderProps {
  children: ReactElement;
}

export const AuthProvider = memo(function AuthProvider({ children }: AuthProviderProps) {
  console.log('Call AuthProvider');
  const fetchStatus = useAppSelector(selectAuthFetchStatus);
  const dispatch = useAppDispatch();
  const isDispatched = useRef(false);

  useEffect(() => {
    if (!isDispatched.current) {
      dispatch(checkAuthRequest());
      isDispatched.current = true;
    }
  }, [dispatch]);

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
});
