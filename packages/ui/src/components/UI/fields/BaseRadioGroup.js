import * as React from 'react';
import { Radio } from '@base-ui-components/react/radio';
import { RadioGroup } from '@base-ui-components/react/radio-group';
import styles from './Base.module.scss';
import Literal from '@ui/literals';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import { Field } from '@base-ui-components/react/field';
import { isEmpty } from '@utils/helper/Helper';

export default function BaseRadioGroup({
  options = [],
  defaultValue,
  value,
  onChange,
  title,
  name,
  className = '',
  dress,
  errorMsg,
  description,
  sx,
  disabled,
  required = false
}) {
  const { lang } = React.useContext(LanguageContext);

  return (
    <Field.Root name={name} className={styles.Field} sx={sx}>
      <Field.Label className={styles.Label}>
        {Literal[lang][title] || title}
        {required && <span className={styles.red_icon}>*</span>}
      </Field.Label>

        <RadioGroup
          aria-labelledby="radio-group-label"
          defaultValue={defaultValue}
          value={value}
          onValueChange={onChange}
          disabled={disabled}
          className={`${styles.RadioGroup} ${className}`}
          sx={sx}
        >
          {options.map(({ label, value }) => {
            // Check if value contains "dress" and apply dress styling
            const isDress = dress || false;
            return (
              <label key={value} className={styles.Item} disabled={disabled}>
                <Radio.Root 
                  value={value} 
                  disabled={disabled}
                  className={isDress ? styles.DressRadio : styles.Radio} 
                >
                  <Radio.Indicator className={isDress? styles.Indicator : styles.RadioIndicator} disabled={disabled}/>
                </Radio.Root>
                {Literal[lang][label] || label}
              </label>
            );
          })}
        </RadioGroup>

      <Field.Description className={!isEmpty(errorMsg) ? styles.Error : styles.Description}>
        {!isEmpty(errorMsg) ? errorMsg : Literal[lang][description] || description}
      </Field.Description>
    </Field.Root>
  );
}
