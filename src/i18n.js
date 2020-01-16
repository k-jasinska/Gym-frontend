import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { detectLanguageFromNavigator } from './helpers/language';
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const lng = detectLanguageFromNavigator();

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: lng,
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
