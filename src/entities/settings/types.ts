import { ErrorResponse, FetchStatus, UserSettings } from 'shared/types/types.ts';

export type SettingsState = {
  settings: UserSettings;
  settingsIsActive: boolean;
  settingsFetchStatus: FetchStatus;
  error: ErrorResponse | null;
};
