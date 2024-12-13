import { ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/reduxHooks.ts';
import { checkAuthRequest, selectAuthFetchStatus } from 'entities/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const fetchStatus = useAppSelector(selectAuthFetchStatus);
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);

  useEffect(() => {
    const initialize = async () => {
      if (!isInitialized.current) {
        await dispatch(checkAuthRequest());
        isInitialized.current = true;
      }
    };

    initialize().catch((err) => {
      console.error('Unhandled error during initialization:', err);
    });
  }, [dispatch]);

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}
