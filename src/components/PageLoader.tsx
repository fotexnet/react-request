import React from 'react';
import ScrollLock from 'react-scrolllock';
import Spinner, { SpinnerProps } from './Spinner';

function PageLoaderComponent(props: SpinnerProps): JSX.Element {
  return (
    <ScrollLock>
      <div className="absolute z-50 top-0 right-0 left-0 bottom-0 opacity-80 bg-white flex items-center justify-center">
        <Spinner {...props} />
      </div>
    </ScrollLock>
  );
}

export default PageLoaderComponent;
