import * as React from 'react';
import { Field } from '@base-ui-components/react/field';
import styles from './Base.module.scss';
import Literal from '@ui/literals';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import { isEmpty } from '@utils/helper/Helper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BaseTextField2 from './BaseTextField2';

export default function BaseSelect({
  label,
  placeHolderText,
  description,
  errorMsg,
  required,
  sx,
  name,
  value,
  onChange,
  options = [],
  onBlur,
  onFocus,
  disabled
}) {
  const { lang } = React.useContext(LanguageContext);

  return (
    <Field.Root name={name} className={styles.Field} sx={sx}>
      {/* Label */}
      <Field.Label className={styles.Label}>
        {Literal[lang][label] || label}
        {required && <span className={styles.red_icon}>*</span>}
      </Field.Label>

      {/* Autocomplete */}
                <div className={styles.inputWrapper}>
    
      <Autocomplete
        fullWidth
        value={value || null}
        disablePortal
        disabled={disabled}
        onChange={(event, newValue) => {
          onChange({ target: { name, value: newValue } });
        }}
        sx={{
          '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
            padding: '4px 4px 5px 5px',
          }
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        options={options}
        getOptionLabel={(option) => option?.label || ''}
        renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        // className={styles.Input}
        isOptionEqualToValue={(option, val) => option?.value === val?.value}
        renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={Literal[lang][placeHolderText] || placeHolderText}
                  className={styles.Input}
                  error={!isEmpty(errorMsg)}
                  sx={{
                    '& input': {
                      border: '0px'
                    },
                    '& label': {
                      fontFamily: '"Kalam", serif',
                    }
                  }}
                />
              )}
      />
      </div>

      {/* Description or Error */}
      <Field.Description className={!isEmpty(errorMsg) ? styles.Error : styles.Description}>
        {!isEmpty(errorMsg) ? errorMsg : Literal[lang][description] || description}
      </Field.Description>
    </Field.Root>
  );
}
