import * as React from 'react';
import { Field } from '@base-ui-components/react/field';
import styles from './Base.module.scss';
import Literal from '@ui/literals';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import { isEmpty } from '@utils/helper/Helper';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export default function BaseTextField2({
  label,
  placeHolderText,
  description,
  errorMsg,
  required,
  sx,
  name,
  value,
  onChange,
  type,
  inputRef,
  onBlur,
  onFocus,
  multiline = undefined,
  rows = 3,
  disabled
}) {
  const { lang } = React.useContext(LanguageContext);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Field.Root name={name} className={styles.Field} sx={sx}>
      <Field.Label className={styles.Label}>
        {Literal[lang][label] || label}
        {required && <span className={styles.red_icon}>*</span>}
      </Field.Label>

        {multiline ? (
          <textarea
            placeholder={Literal[lang][placeHolderText] || placeHolderText}
            className={`${styles.Input}`}
            value={value}
            onChange={(e) => onChange({ target: { name, value: e.target.value } })}
            rows={rows}
            disabled={disabled}
            style={{ resize: 'vertical', width: '100%' }} // Ensure full width and resize is enabled
          />
        ) : (
          <div className={styles.inputWrapper}>
              <Field.Control
                required={required}
                placeholder={Literal[lang][placeHolderText] || placeHolderText}
                className={`${styles.Input} ${type === 'password' && !showPassword ? styles.passwordInput : ''}`}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange({ target: { name, value: e.target.value } })}
                onBlur={onBlur}
                onFocus={onFocus}
                type={(type === 'password' && !showPassword) ? 'password' : (type!='password')? type : 'text'}
                ref={inputRef}
                multiline={multiline}
                rows={rows}
              />

              {type === 'password' && !multiline && (
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={styles.eyeIcon}
                  tabIndex={-1}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )}
          </div>
        )}


      <Field.Description className={!isEmpty(errorMsg) ? styles.Error : styles.Description}>
        {!isEmpty(errorMsg) ? errorMsg : Literal[lang][description] || description}
      </Field.Description>
    </Field.Root>
  );
}
