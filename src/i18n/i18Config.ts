import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEnglish from "./translation/en/translation.json";
import translationArabic from "./translation/ar/translation.json";
import translationSpanish from "./translation/sp/translation.json";
const resources = {
  en: {
    translation: translationEnglish,
  },
  ar: {
    translation: translationArabic,
  },
  sp: {
    translation: translationSpanish,
  },
};
i18next.use(initReactI18next).init({
  resources,
  lng: "en", //default language
  fallbackLng: "en",
});

export default i18next;
