import React from 'react';
import styles from '../styles/WithLoading.module.css';

export type SpinnerProps = {
  color?: string;
};

function Spinner({ color = '#95a0ca' }: SpinnerProps): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '250px',
      }}
    >
      <div className={styles.spinner} style={{ borderTopColor: color }}></div>
    </div>
  );
}

export default Spinner;
