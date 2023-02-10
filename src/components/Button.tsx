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
