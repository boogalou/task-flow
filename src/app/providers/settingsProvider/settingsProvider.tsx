import { memo, ReactNode, useEffect, useRef } from 'react';
import { storageAdapter } from '../../../shared/lib/storage.adapter.ts';
import { UserSettings } from '../../../shared/types/types.ts';
import { useAppDispatch } from '../../../shared/lib/reduxHooks.ts';
import { setLanguage, setTheme } from '../../../components/settings/model/settings.slice.ts';
import { getSettingsRequest } from '../../../components/settings/model/settingsThunk.ts';

export const SettingsProvider = memo(function SettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  console.log('Call SettingsProvider');
  const dispatch = useAppDispatch();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const localSettings = storageAdapter.get<UserSettings>('app-settings');
      if (localSettings) {
        dispatch(setLanguage(localSettings.language));
        dispatch(setTheme(localSettings.theme));
      } else {
        dispatch(getSettingsRequest())
          .unwrap()
          .then((settings) => storageAdapter.save<UserSettings>('app-settings', settings))
          .catch(() => console.error());
      }
      isInitialized.current = true;
    }
  }, [dispatch]);

  return <>{children}</>;
});
