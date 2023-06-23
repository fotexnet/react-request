import { SpinnerProps } from '../../components/Spinner';
import withLoading, { WithLoadingProps } from '../../hoc/withLoading';

function createLoading<T extends object>(spinnerProps: SpinnerProps) {
  return (Component: React.ComponentType<T>): React.FC<Partial<T> & WithLoadingProps> => {
    return withLoading(Component, spinnerProps);
  };
}

export default createLoading;
