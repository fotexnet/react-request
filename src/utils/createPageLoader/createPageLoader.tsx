import React from 'react';
import { SpinnerProps } from 'src/components';
import { WithLoadingProps } from 'src/hoc';
import withPageLoader from 'src/hoc/withPageLoader';

function createPageLoader<T extends object>(config: SpinnerProps) {
  return (Component: React.ComponentType<T>): React.FC<Partial<T> & WithLoadingProps> => {
    return withPageLoader(Component, config);
  };
}

export default createPageLoader;
