import React from 'react';
import dynamic from 'next/dynamic';
import styles from './Base.module.scss';
import { isEmpty } from '@utils/helper/Helper';


const MuiOtpInput = dynamic(
  () => import('mui-one-time-password-input').then(mod => mod.MuiOtpInput),
  { ssr: false }
);
const BaseOtp = ({ value, handleChange, id, errorMsg, required }) => {
  return (
    <div className={styles.mobileContainer}>
      <MuiOtpInput 
        value={value} 
        onChange={handleChange} 
        id={id}
        required={required}
        length={6}
      />
      {errorMsg && (
        <span className={!isEmpty(errorMsg)?styles.ErrorForMobile : styles.Description}>
          <p>{errorMsg}</p>
        </span>
      )}
    </div>
  );
};

export default BaseOtp;
