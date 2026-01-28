import React, { useContext } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Ensure default styles are loaded
import styles from "./Base.module.scss";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { isEmpty } from "@utils/helper/Helper";
import { Field } from "@base-ui-components/react/field";

const BaseMobileField = ({ formData, setFormData, errors, setErrors, required, label, description, name, disabled }) => {
  const { lang } = useContext(LanguageContext);
  if(isEmpty(formData?.mobile)){
    setFormData((prev) => ({
      ...prev,
      mobile: "+91",
    }));
  }
  const handlePhoneChange = (value, country) => {
    let error = "";

    const cleanedNumber = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const fullNumber = `+${cleanedNumber}`; // Store full number with country code

    setFormData((prev) => ({
      ...prev,
      mobile: fullNumber,
    }));

    const nationalNumber = cleanedNumber.slice(country.dialCode.length);

    if (!nationalNumber.trim()) {
      if (required) {
        error = "This field is required.";
      }
    } else if (!/^\d{7,15}$/.test(nationalNumber)) {
      error = "Invalid mobile number (7-15 digits required).";
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors.hasOwnProperty("mobile")) delete newErrors["mobile"];
      if (error) newErrors["mobile"] = error;
      return newErrors;
    });
  };

  return (
    <Field.Root name={name} className={styles.Field}>
      <div className={styles.mobileContainer}>
        <label className={styles.phoneInputLabel}>
          {label ? (Literal[lang][label] || label) : Literal[lang].mobile}
          {required && <span className={styles.red_icon}>*</span>}
        </label>
        <div className={styles.mobileInputField}>
          <PhoneInput
            country={"in"}
            value={formData?.mobile}
            focusBlur={false}
            onChange={handlePhoneChange}
            inputProps={{
              name: "mobile",
              required: required,
              id: "mobile",
              tabIndex: -1,
            }}
            containerClass={styles.phoneInputContainer}
            inputClass={styles.phoneInputField}
            buttonClass={styles.flagDropdown}
            dropdownClass={styles.countryList}
            autoFormat={true}
            disabled={disabled}
            disableDropdown={disabled}
            countryCodeEditable={false}
            specialLabel=""
          />
        </div>
        <Field.Description className={!isEmpty(errors.mobile) ? styles.Error : styles.Description}>
          {!isEmpty(errors.mobile) ? errors.mobile : Literal[lang][description] || description}
        </Field.Description>
      </div>
    </Field.Root>
  );
};

export default BaseMobileField;
