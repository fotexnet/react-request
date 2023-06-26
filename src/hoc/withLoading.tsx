import React, { useCallback, useMemo } from 'react';
import Spinner, { SpinnerProps } from '../components/Spinner';

export type WithLoadingProps = {
  isLoading: boolean;
};

function withLoading<TProps extends object>(
  Component: React.ComponentType<TProps>,
  config?: WithLoadingConfig
): React.FC<Partial<TProps> & WithLoadingProps> {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  return function WithLoadingComponent({ isLoading, ...props }) {
    const { containerProps } = useMemo(() => (config || {}) as WithLoadingConfig, [config]);

    const LoadingIndicator = useCallback(() => {
      return isCustomLoadingIndicator(config) ? (
        config.CustomLoadingIndicator
      ) : (
        <div {...containerProps}>
          <Spinner {...config} />
        </div>
      );
    }, []);

    return isLoading ? <LoadingIndicator /> : <Component {...(props as TProps)} />;
  };
}

export default withLoading;

function isCustomLoadingIndicator(argument: unknown): argument is CustomLoadingIndicator {
  return typeof argument === 'object' && Object.getOwnPropertyNames(argument).includes('CustomSpinner');
}

type WithLoadingConfig = { containerProps?: React.ComponentPropsWithoutRef<'div'> } & (
  | SpinnerProps
  | CustomLoadingIndicator
);
type CustomLoadingIndicator = { CustomLoadingIndicator: JSX.Element };
