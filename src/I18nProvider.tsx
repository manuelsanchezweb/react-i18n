import React, { createContext, useEffect, useState } from "react";

// Translation files
import de from "./locale/de.js";
import en from "./locale/en.js";
import es from "./locale/es.js";

interface Translation {
  [key: string]: any;
}

interface I18nContextValue {
  language: string;
  changeLanguage: (lang: string) => void;
  t: Translation;
}

// Create the context
export const I18nContext = createContext<I18nContextValue | null>(null);

const supportedLanguages = ["en", "es", "de"];
const defaultLanguage = "en";

// The provider
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to store the current language
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || navigator.language.split("-")[0]
  );

  // Load the initial language from the browser or local storage
  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    const storedLang = localStorage.getItem("language");

    if (storedLang && supportedLanguages.includes(storedLang)) {
      setLanguage(storedLang);
    } else if (supportedLanguages.includes(browserLang)) {
      setLanguage(browserLang);
    } else {
      setLanguage(defaultLanguage);
    }
  }, []);

  // Function to change the language
  const changeLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  // The translations object
  const translations: { [key in string]: Translation } = {
    en,
    es,
    de,
  };

  // The translate method
  // we're checking if the second argument is a number, and if it is, we're checking if the value has a one or other key based on the value of count. If it does, we use that key to get the correct pluralization string. We're also replacing {count} in the string with the actual count, if it exists.
  const t = {
    translate: (key: string | number, count?: number) => {
      let keys = key.toString().split(".");
      let value: any = translations[language];
      for (let i = 0; i < keys.length; i++) {
        if (value && value.hasOwnProperty(keys[i])) {
          value = value[keys[i]];
        } else {
          return "";
        }
      }
      if (
        typeof count === "number" &&
        value.hasOwnProperty(count === 1 ? "one" : "other")
      ) {
        value = value[count === 1 ? "one" : "other"];
      } else if (value.hasOwnProperty("one")) {
        value = value["one"];
      }
      if (typeof value === "string" && count) {
        return value.replace("{count}", count.toString());
      }
      return value;
    },
  };

  // Render the provider
  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
