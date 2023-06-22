import { AxiosInstance } from 'axios';
import React, { PropsWithChildren, createContext, useContext } from 'react';

const HttpContext = createContext<AxiosInstance | null>(null);

function HttpProvider({ client, children }: PropsWithChildren<{ client: AxiosInstance }>): JSX.Element {
  return <HttpContext.Provider value={client}>{children}</HttpContext.Provider>;
}

export default HttpProvider;

export function useHttpClient(): AxiosInstance {
  const context = useContext(HttpContext);
  if (context === null) throw new Error('No client provided!');
  return context;
}
