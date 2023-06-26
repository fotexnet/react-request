import withLoading, { WithLoadingConfig, WithLoadingProps } from '../../hoc/withLoading';

function createLoading(config: WithLoadingConfig) {
  return <T extends object | Record<string, unknown>>(
    Component: React.ComponentType<T>
  ): React.FC<Partial<T> & WithLoadingProps> => {
    return withLoading(Component, config);
  };
}

export default createLoading;
