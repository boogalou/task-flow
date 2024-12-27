import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../shared/assets/locales/en.json';
import translationRU from '../shared/assets/locales/ru.json';
import { storageAdapter } from 'shared/lib/storage.adapter.ts';
import { UserSettings } from 'shared/types/types.ts';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

const savedSettings = storageAdapter.get<UserSettings>('app-settings')!;

const savedLanguage = savedSettings && savedSettings.language === 'rus' ? 'ru' : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
