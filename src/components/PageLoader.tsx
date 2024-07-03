import React, { useEffect, useState } from 'react';
import styles from '../styles/PageLoader.module.css';
import Spinner, { SpinnerProps } from './Spinner';

export type PageLoaderProps = SpinnerProps & { backdropColor?: string };

function PageLoader({ backdropColor, ...props }: PageLoaderProps): JSX.Element {
  const [lockPosition, setLockPosition] = useState<number>(0);

  useEffect(() => {
    setLockPosition(window.scrollY);
  }, []);

  return (
    <>
      <div className={styles.container} style={{ top: lockPosition }}>
        <div className={styles.backdrop} style={{ backgroundColor: backdropColor }}></div>
        <Spinner {...props} />
      </div>
    </>
  );
}

export default PageLoader;
