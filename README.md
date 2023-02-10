# Librería de React sobre i18n con handle para varios idiomas (+ plural)

## Licencia

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Setup

- Crear una carpeta dentro de src llamada `locale`, y crea los archivos de traducciones dentro. Por ejemplo, crea `en.ts`, `de.ts` y `es.ts`. Una estructura podría ser la siguiente:

```javascript
// src/locale/es.ts
const es = {
  languages: {
    en: "Inglés",
    es: "Español",
    de: "Alemán",
  },
  settings: {
    languageChange: "Cambiar idioma",
    languageCurrent: "Idioma elegido",
  },
  addMessage: "Recibir un mensaje",
  messages: {
    one: "Tienes un mensaje",
    other: "Tienes {count} mensajes",
  },
  title: "Título en español",
  description: "Descripción increíble",
};

export default es;
```

```javascript
// src/locale/en.ts
const en = {
  languages: {
    en: "English",
    es: "Spanish",
    de: "German",
  },
  settings: {
    languageChange: "Choose language",
    languageCurrent: "Current language",
  },
  addMessage: "Add message",
  messages: {
    one: "You have one message",
    other: "You have {count} messages",
  },
  title: "Title in English",
  description: "Cool description",
};

export default en;
```

- Importa los archivos en el archivo `I18nProvider.tsx`.

```javascript
// Translation files
import de from "./locale/de.js";
import en from "./locale/en.js";
import es from "./locale/es.js";
```

- Cambia dentro del provider los idiomas que quieres tener.

```javascript
const supportedLanguages = ["en", "es", "de"];
const defaultLanguage = "en";
```

```javascript
// The translations object
const translations: { [key in string]: Translation } = {
    en,
    es,
    de,
};
```

- Usa el método t.translate para un handle de las traducciones, como en el ejemplo dentro de `src/components/Title.tsx`.

```js
// src/components/Title.tsx
import { useContext } from "react";
import { I18nContext } from "../I18nProvider";

export const Title = ({ className }: any) => {
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error(
      "The I18n context is not initialized. Make sure you have the provider set up correctly."
    );
  }

  return (
    <div className={`${className} shadow-neo`}>
      {context.t.translate("settings.languageCurrent")}:{" "}
      <strong>{context.language}</strong>
      <h1>{context.t.translate("title")}</h1>
    </div>
  );
};
```

- También es posible anidar objetos en caso de que quieras hacer una mejor estructura en tus traducciones. En `src/components/Title.tsx` tienes el ejemplo con las settings, y aquí en `src/components/LanguageSelector.tsx` tienes otro con los idiomas.

```js
import { useContext } from "react";
import { IconLanguage } from "../assets/IconLanguage";
import { I18nContext } from "../I18nProvider";

export const LanguageSelector = () => {
  const context = useContext(I18nContext);

  if (context === null) {
    throw new Error(
      "The I18n context is not initialized. Make sure you have the provider set up correctly."
    );
  }

  return (
    <label htmlFor="select" className="language-switcher">
      <IconLanguage />
      <select
        name="select"
        id="select"
        className="language-switcher-input"
        value={context.language}
        onChange={(e) => context.changeLanguage(e.target.value)}
      >
        <option value="en">{context.t.translate("languages.en")}</option>
        <option value="es">{context.t.translate("languages.es")}</option>
        <option value="de">{context.t.translate("languages.de")}</option>
      </select>
    </label>
  );
};
```

- Si quieres ver el handling del plural, mira el archivo de `src/components/Buttons.tsx`.

```js
import { useContext, useState } from "react";
import { I18nContext } from "../I18nProvider";

const Button = () => {
  const [count, setCount] = useState(1);
  const context = useContext(I18nContext);
  if (context === null) {
    throw new Error(
      "The I18n context is not initialized. Make sure you have the provider set up correctly."
    );
  }

  return (
    <div className="text__description__outer">
      <button className="shadow-neo" onClick={() => setCount(count + 1)}>
        {context.t.translate("addMessage")}
      </button>
      <div className="text__description__inner">
        <p>{context.t.translate("messages", count)}</p>
        {/* This would directly render 5 */}
        {/* <p>{context.t.translate("messages", 5)}</p> */}
      </div>
    </div>
  );
};

export default Button;
```

## Autores

- [@manuelsanchezweb](https://www.github.com/manuelsanchezweb)

## Installation

Es un proyecto hecho con Create Vite, así que lo puedes instalar fácilmente con un `npm i` y `npm run dev`.
