import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import EN from './locales/EN.json';
import HN from './locales/HN.json';
import OR from './locales/OR.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: EN },
      hn: { translation: HN },
      or: { translation: OR },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
