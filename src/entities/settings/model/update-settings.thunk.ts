import { settingsService } from 'shared/api/settings.service.ts';
import { createAsyncAction } from 'shared/lib/thunk.adapter.ts';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from 'entities/settings/types.ts';
import { ErrorResponse, UserSettings } from 'shared/types/types.ts';

export const updateSettingsRequest = createAsyncAction({
  actionType: 'settings/update',
  method: settingsService.updateSettings,
});

export const updateSettingsPending: CaseReducer<SettingsState> = (state) => {
  state.settingsFetchStatus = 'loading';
  state.error = null;
};

export const updateSettingsFulfilled: CaseReducer<SettingsState, PayloadAction<UserSettings>> = (
  state,
  action,
) => {
  state.settingsFetchStatus = 'succeeded';
  state.settings = action.payload;
  state.error = null;
};

export const updateSettingsRejected: CaseReducer<SettingsState> = (state, action) => {
  state.settingsFetchStatus = 'failed';
  state.error = action.payload as ErrorResponse;
};
