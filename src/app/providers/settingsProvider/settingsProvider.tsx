import { ReactNode, useEffect } from 'react';
import { storageAdapter } from '../../../shared/lib/localStorageAdapter.ts';
import { UserSettings } from '../../../shared/types/types.ts';
import { useAppDispatch } from '../../store/reduxHooks.ts';
import { setLanguage, setTheme } from '../../../components/settings/model/settings.slice.ts';
import { getSettingsRequest } from '../../../components/settings/model/settingsThunk.ts';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
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
  }, [dispatch]);

  return <>{children}</>;
}
