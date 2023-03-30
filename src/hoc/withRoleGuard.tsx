import React from 'react';

function withRoleGuard<TProps extends object>(
  Component: React.ComponentType<TProps>,
  canLoad: () => boolean
): React.ComponentType<TProps> {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  return function WithRoleGuardComponent(props) {
    return canLoad() ? <Component {...(props as TProps)} /> : null;
  };
}

export default withRoleGuard;
