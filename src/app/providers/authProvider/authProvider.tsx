import { memo, ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/reduxHooks.ts';
import { checkAuthRequest, selectAuthFetchStatus } from 'entities/auth';

export const AuthProvider = memo(function AuthProvider({ children }: { children: ReactNode }) {
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
