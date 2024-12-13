import { ReactNode, useEffect, useRef } from 'react';
import { storageAdapter } from '../../../shared/lib/storage.adapter.ts';
import { UserSettings } from '../../../shared/types/types.ts';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/reduxHooks.ts';
import { setLanguage, setTheme } from '../../../components/settings/model/settings.slice.ts';
import { getSettingsRequest } from '../../../components/settings/model/settingsThunk.ts';
import { selectIsAuth } from 'entities/auth';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    const initialize = async () => {
      if (!isInitialized.current && isAuth) {
        const localSettings = storageAdapter.get<UserSettings>('app-settings');
        if (localSettings) {
          dispatch(setLanguage(localSettings.language));
          dispatch(setTheme(localSettings.theme));
        } else {
          await dispatch(getSettingsRequest());
        }
        isInitialized.current = true;
      }
    };
    initialize();
  }, [dispatch]);

  return <>{children}</>;
}
