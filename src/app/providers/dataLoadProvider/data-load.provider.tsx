import { ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks.ts';
import { getTasksRequest } from 'entities/task';
import { getUserRequest } from 'entities/user/model/get-user.thunk.ts';
import { selectIsAuth } from 'entities/auth';

export function DataLoadProvider({ children }: { children?: ReactNode }) {
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    const initialize = async () => {
      if (!isInitialized.current && isAuth) {
        await dispatch(getUserRequest());
        await dispatch(getTasksRequest());
        isInitialized.current = true;
      }
    };

    if (isAuth) {
      initialize();
    }
  }, [dispatch, isAuth]);

  return children;
}
