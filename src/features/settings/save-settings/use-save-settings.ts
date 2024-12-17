import { themeSelector, langSelector, updateSettingsRequest } from 'entities/settings';
import { storageAdapter } from 'shared/lib/storage.adapter.ts';
import { UserSettings } from 'shared/types/types.ts';
import { useAppDispatch } from 'shared/lib/reduxHooks.ts';

export function useSaveSettings() {
  const dispatch = useAppDispatch();
  const currentTheme = themeSelector();
  const currentLang = langSelector();

  const handleSaveButton = () => {
    dispatch(
      updateSettingsRequest({
        theme: currentTheme,
        language: currentLang,
      }),
    );

    storageAdapter.save<UserSettings>('app-settings', {
      theme: currentTheme,
      language: currentLang,
    });
  };

  return { handleSaveButton };
}
