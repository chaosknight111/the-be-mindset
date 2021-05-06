import i18n from 'i18next';
import LanguageDetector from './LanguageDetector';

export default {
  initAsync: async (resources: any) => {
    const language = LanguageDetector.getCurrentLocale();

    language &&
      (await i18n.init({
        resources,
        defaultNS: 'common',
        fallbackNS: 'common',
        fallbackLng: 'en',
        lng: language.languageTag,
        keySeparator: false,
      }));
  },
};
