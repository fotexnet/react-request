import React from 'react';
import ScrollLock from 'react-scrolllock';
import styles from '../styles/PageLoader.module.css';
import Spinner, { SpinnerProps } from './Spinner';

function PageLoaderComponent(props: SpinnerProps): JSX.Element {
  return (
    <ScrollLock>
      <div className={styles.container}>
        <Spinner {...props} />
      </div>
    </ScrollLock>
  );
}

export default PageLoaderComponent;
