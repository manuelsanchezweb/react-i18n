// Function to get the language from browser
const getLanguageFromNavigator = () => {
  // Get the browser's language
  const browserLanguage = navigator.language;
  console.log(browserLanguage);
  // Return the first two characters of the language code
  return browserLanguage.substring(0, 2);
};

// Function to get the language from local storage
export const getLanguageFromLocalStorage = () => {
  // Get the stored language from local storage
  const storedLanguage = localStorage.getItem("language");
  // Return the stored languge if it exists, otherwise return the browser's language
  return storedLanguage ? storedLanguage : getLanguageFromNavigator();
};

// Function to set the language in local storage
export const setLanguageInLocalStorage = (language: string) => {
  // Set the language in local storage
  localStorage.setItem("language", language);
};

// export const getTranslationFile = (language) => {
//   // Return the translation file for the specified language
//   let translationFile = en;
//   switch (language) {
//     case "en":
//       translationFile = en;
//       break;
//     case "de":
//       translationFile = de;
//       break;
//     case "es":
//       translationFile = es;
//       break;
//     case "ru":
//       translationFile = ru;
//       break;
//     default:
//       translationFile = en;
//       break;
//   }
//   return translationFile;
// };
