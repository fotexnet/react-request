import React, { PropsWithChildren, createContext, useContext, useState } from 'react';
import PageLoader, { PageLoaderProps as LoaderProps } from '../components/PageLoader';

type PageLoaderProps = {
  setPageLoading: (value: boolean) => void;
};

const PageLoaderContext = createContext<PageLoaderProps | null>(null);

function PageLoaderProvider({ children, ...props }: PropsWithChildren<LoaderProps>): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <PageLoaderContext.Provider value={{ setPageLoading: setIsLoading }}>
      {isLoading && <PageLoader {...props} />}
      {children}
    </PageLoaderContext.Provider>
  );
}

export default PageLoaderProvider;

export function usePageLoader(): PageLoaderProps {
  const context = useContext(PageLoaderContext);
  if (context === null) throw new Error('Needs a PageLoader provider!');
  return context;
}
