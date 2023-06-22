import React from 'react';
import PageLoader from '../components/PageLoader';
import { SpinnerProps } from '../components/Spinner';
import { WithLoadingProps } from './withLoading';

function withPageLoader<TProps extends object>(
  Component: React.ComponentType<TProps>,
  spinnerProps: SpinnerProps
): React.FC<Partial<TProps> & WithLoadingProps> {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  return function WithRoleGuardComponent({ isLoading, ...props }) {
    return (
      <>
        {isLoading && <PageLoader {...spinnerProps} />}
        <Component {...(props as TProps)} />
      </>
    );
  };
}

export default withPageLoader;
