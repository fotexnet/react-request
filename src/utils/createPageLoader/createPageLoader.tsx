import React from 'react';
import { SpinnerProps } from '../../components/Spinner';
import { WithLoadingProps } from '../../hoc/withLoading';
import withPageLoader from '../../hoc/withPageLoader';

function createPageLoader<T extends object>(config: SpinnerProps) {
  return (Component: React.ComponentType<T>): React.FC<Partial<T> & WithLoadingProps> => {
    return withPageLoader(Component, config);
  };
}

export default createPageLoader;
