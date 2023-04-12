import React from 'react';
import styles from '../styles/Spinner.module.css';

export type SpinnerProps = {
  color?: string;
  stripeWidth?: number;
  width?: number;
};

function Spinner({ color = 'steelblue', width = 300, stripeWidth = 15 }: SpinnerProps): JSX.Element {
  return (
    <div className={styles.spinner__container} style={{ width, height: width }}>
      <div
        className={`${styles.spinner__sector} ${styles.spinner__sector_1}`}
        style={{ borderTopColor: color, borderWidth: stripeWidth }}
      ></div>
      <div
        className={`${styles.spinner__sector} ${styles.spinner__sector_2}`}
        style={{ borderTopColor: color, borderWidth: stripeWidth }}
      ></div>
      <div
        className={`${styles.spinner__sector} ${styles.spinner__sector_3}`}
        style={{ borderTopColor: color, borderWidth: stripeWidth }}
      ></div>
    </div>
  );
}

export default Spinner;
