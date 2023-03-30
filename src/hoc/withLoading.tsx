import React from 'react';
import Spinner, { SpinnerProps } from '../components/Spinner';

export type WithLoadingProps = {
  isLoading: boolean;
};

function withLoading<TProps extends object>(
  Component: React.ComponentType<TProps>,
  spinnerProps?: SpinnerProps
): React.FC<Partial<TProps> & WithLoadingProps> {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  return function WithLoadingComponent({ isLoading, ...props }) {
    return isLoading ? <Spinner {...spinnerProps} /> : <Component {...(props as TProps)} />;
  };
}

export default withLoading;
