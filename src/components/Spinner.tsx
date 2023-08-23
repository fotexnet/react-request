import React, { CSSProperties, useMemo } from 'react';
import { DEFAULT_COLOR } from '../constants';
import styles from '../styles/Spinner.module.css';

export type SpinnerProps = {
  color?: string | [string, string, string];
  stripeWidth?: number;
  width?: number;
  blendMode?: CSSProperties['mixBlendMode'];
};

function Spinner({ color = DEFAULT_COLOR, width = 300, stripeWidth = 15, blendMode }: SpinnerProps): JSX.Element {
  const firstColor = useMemo(() => (Array.isArray(color) ? color[0] : color), [color]);
  const secondColor = useMemo(() => (Array.isArray(color) ? color[1] : color), [color]);
  const thirdColor = useMemo(() => (Array.isArray(color) ? color[2] : color), [color]);

  return (
    <div className={styles.spinner__container} style={{ width, height: width }}>
      <div
        className={`${styles.spinner__sector} ${styles.spinner__sector_1}`}
        style={{ mixBlendMode: blendMode, borderTopColor: firstColor, borderWidth: stripeWidth }}
      ></div>
      <div
        className={`${styles.spinner__sector} ${styles.spinner__sector_2}`}
        style={{ mixBlendMode: blendMode, borderTopColor: secondColor, borderWidth: stripeWidth }}
      ></div>
      <div
        className={`${styles.spinner__sector} ${styles.spinner__sector_3}`}
        style={{ mixBlendMode: blendMode, borderTopColor: thirdColor, borderWidth: stripeWidth }}
      ></div>
    </div>
  );
}

export default Spinner;
