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
