import React from 'react';
import { WithLoadingProps } from './withLoading';
import { SpinnerProps } from 'src/components';
import PageLoaderComponent from 'src/components/PageLoader';

function withPageLoader<TProps extends object>(
  Component: React.ComponentType<TProps>,
  spinnerProps: SpinnerProps
): React.FC<Partial<TProps> & WithLoadingProps> {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  return function WithRoleGuardComponent({ isLoading, ...props }) {
    return (
      <>
        {isLoading && <PageLoaderComponent {...spinnerProps} />}
        <Component {...(props as TProps)} />
      </>
    );
  };
}

export default withPageLoader;
