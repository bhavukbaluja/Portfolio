import React from "react";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import "./UserActivationPage.scss";

export default function PasswordRequirementComponent() {
    const { lang } = React.useContext(LanguageContext);
  return (
    <div >
      <div className="password-req-header">
        <span variant="h7">{Literal[lang].passwordRequirementMsg}:</span>
      </div>
      <ul className="password-req-list">
        <li className="password-req-list-li">
          <span>Aa ({Literal[lang].upperLowerCase})
          </span>
        </li>
        <li className="password-req-list-li">
          <span>13 ({Literal[lang].numericals})</span>
        </li>
        <li className="password-req-list-li">
          <span>@! ({Literal[lang].specialChar})</span>
        </li>
      </ul>
    </div>
  );
}
