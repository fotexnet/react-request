import { SpinnerProps } from '../../components/Spinner';
import withLoading, { WithLoadingProps } from '../../hoc/withLoading';

function createLoading(spinnerProps: SpinnerProps) {
  return <T extends object | Record<string, unknown>>(
    Component: React.ComponentType<T>
  ): React.FC<Partial<T> & WithLoadingProps> => {
    return withLoading(Component, spinnerProps);
  };
}

export default createLoading;
