export { settingsSlice } from './model/settings.slice.ts';
export { getSettingsRequest } from './model/get-settings.thunk.ts';
export { updateSettingsRequest } from './model/update-settings.thunk.ts';
export {
  langSelector,
  themeSelector,
  settingsIsActiveSelector,
} from './model/settings.selectors.ts';
