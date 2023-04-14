import React, { useCallback } from 'react';
import Spinner, { SpinnerProps } from '../components/Spinner';

export type WithLoadingProps = {
  isLoading: boolean;
};

function withLoading<TProps extends object>(
  Component: React.ComponentType<TProps>,
  spinnerProps?: SpinnerProps | CustomLoadingIndicator
): React.FC<Partial<TProps> & WithLoadingProps> {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  return function WithLoadingComponent({ isLoading, ...props }) {
    const LoadingIndicator = useCallback(() => {
      return isCustomLoadingIndicator(spinnerProps) ? (
        spinnerProps.CustomLoadingIndicator
      ) : (
        <Spinner {...spinnerProps} />
      );
    }, []);
    return isLoading ? <LoadingIndicator /> : <Component {...(props as TProps)} />;
  };
}

export default withLoading;

function isCustomLoadingIndicator(argument: unknown): argument is CustomLoadingIndicator {
  return typeof argument === 'object' && Object.getOwnPropertyNames(argument).includes('CustomSpinner');
}

type CustomLoadingIndicator = { CustomLoadingIndicator: JSX.Element };
