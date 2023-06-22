import React, { useEffect, useState } from 'react';
import ScrollLock from 'react-scrolllock';
import styles from '../styles/PageLoader.module.css';
import Spinner, { SpinnerProps } from './Spinner';

function PageLoader(props: SpinnerProps): JSX.Element {
  const [lockPosition, setLockPosition] = useState<number>(0);

  useEffect(() => {
    setLockPosition(window.scrollY);
  }, []);

  return (
    <ScrollLock>
      <div className={styles.container} style={{ top: lockPosition }}>
        <div className={styles.backdrop}></div>
        <Spinner {...props} />
      </div>
    </ScrollLock>
  );
}

export default PageLoader;
