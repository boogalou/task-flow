import { apiClient } from 'shared/api/base-api.ts';
import { AxiosResponse } from 'axios';
import { UserSettings } from '../../../shared/types/types.ts';

class SettingsService {
  public async getSettings(): Promise<AxiosResponse<UserSettings>> {
    return await apiClient.get('/settings');
  }

  public async updateSettings(payload: UserSettings): Promise<AxiosResponse<UserSettings>> {
    return await apiClient.patch('/settings', payload);
  }
}

export const settingsService = new SettingsService();
