import { Field } from '@base-ui-components/react/field';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as React from 'react';
import { isEmpty } from '@utils/helper/Helper';
import Literal from '@ui/literals';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import styles from './Base.module.scss';

export default function BaseDatePicker({
  label,
  required,
  errorMsg,
  description,
  sx,
  name,
  value,
  disabled,
  defaultValue,
  onChange
}) {
  const { lang } = React.useContext(LanguageContext);
  const threeYearsAgo = dayjs().subtract(3, 'year');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Field.Root name={name} className={styles.Field} sx={sx}>
        {/* Label */}
        <Field.Label className={styles.Label}>
          {Literal[lang][label] || label}
          {required && <span className={styles.red_icon}>*</span>}
        </Field.Label>

        <DatePicker
        //   value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          maxDate={threeYearsAgo}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: true,
              sx: {
                height: '100%',
                // minWidth: '250px',
                '& .MuiInputBase-root': {
                  paddingLeft: '0.875rem',
                  paddingRight: '20px',
                  width: `100%`,
                  height: `50px`,
                  borderRadius: `0.375rem`,
                  fontSize: `1rem`,
                  backgroundColor: `transparent`,
                  color: `var(--color-gray-900)`,
                },
          
                // ✅ Focus styles here
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--color-blue)', // your custom color
                  borderWidth: '2px',
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  zIndex: 2,
                  outline: 'none',
                  boxShadow: 'none !important', // or your desired shadow
                },
              },
              error: !isEmpty(errorMsg),
              helperText: '',
            }
          }}          
          openTo="year"
        />

        {/* Error or Description */}
        <Field.Description className={!isEmpty(errorMsg) ? styles.Error : styles.Description}>
          {!isEmpty(errorMsg) ? errorMsg : Literal[lang][description] || description}
        </Field.Description>
      </Field.Root>
    </LocalizationProvider>
  );
}
