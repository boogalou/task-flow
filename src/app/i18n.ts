import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../shared/assets/locales/en.json';
import translationRU from '../shared/assets/locales/ru.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

const savedLanguage = localStorage.getItem('app-language') === 'rus' ? 'ru' : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
