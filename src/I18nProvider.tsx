import React, { createContext, useEffect, useState } from "react";

// Los archivos de traducción
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

// Aquí estamos creando el context
export const I18nContext = createContext<I18nContextValue | null>(null);

const supportedLanguages = ["en", "es", "de"];
const defaultLanguage = "en";

// Aquí tenemos el provider
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // El estado que guarda el idioma elegido
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || navigator.language.split("-")[0]
  );

  // Cargamos el idioma inicial del navegador o del local storage
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

  // La función que cambia el idioma -> mira el LanguageSelector
  const changeLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  // El objeto de las traducciones
  const translations: { [key in string]: Translation } = {
    en,
    es,
    de,
  };

  // La magia: el método translate
  // Aquí miramos si el segundo argumento que se nos pasa es un número, si lo es, miramos si tiene las key one y other con count dentro. Reemplazamos entonces{count} con el número correcto si existe.
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

  // Renderizamos el provider
  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};
