import React from "react";
import { useTranslation } from "react-i18next";

const Translation: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    i18n.changeLanguage(language); //change the language
    document.dir = i18n.dir(); //change the direction for language
  };
  return (
    <>
      <div>
        <select
          className="custom-select"
          style={{ width: 200, margin: "10px" }}
          onChange={onClickLanguageChange}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="sp">Spanish</option>
        </select>
        <div style={{ margin: "10px" }}>
          {t("Welcome to React")} <br />
        </div>
      </div>
    </>
  );
};

export default Translation;
