import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

let lang = window.localStorage.getItem('current-lg') ||  'vi'
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    lng: lang,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false
    },

    react: {
      wait: true,
    },
  });

 export default i18n;