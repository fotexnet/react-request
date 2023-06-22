import React from 'react';
import ScrollLock from 'react-scrolllock';
import styles from '../styles/PageLoader.module.css';
import Spinner, { SpinnerProps } from './Spinner';

function PageLoader(props: SpinnerProps): JSX.Element {
  return (
    <ScrollLock>
      <div className={styles.container}>
        <Spinner {...props} />
      </div>
    </ScrollLock>
  );
}

export default PageLoader;
