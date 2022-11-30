import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
//import '../../../../public/assets/locals'
const fallbackLng = ["en"];

i18n
  // load translations using http (default                                               public/assets/locals/en/translations)
  //.use(LanguageDetector) // detect user language
  .use(HttpApi)
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng, // fallback language is english.

    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
    },

    debug: false,

    backend: {
      loadPath: "/assets/locals/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
