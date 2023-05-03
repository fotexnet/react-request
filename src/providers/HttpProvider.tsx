import { AxiosInstance } from 'axios';
import React, { createContext, useContext } from 'react';

const HttpContext = createContext<AxiosInstance | null>(null);

const HttpProvider: React.FC<React.PropsWithChildren<{ client: AxiosInstance }>> = ({ client, children }) => {
  return <HttpContext.Provider value={client}>{children}</HttpContext.Provider>;
};

export default HttpProvider;

export const useHttpClient = (): AxiosInstance => {
  const context = useContext(HttpContext);
  if (context === null) throw new Error('No client provided!');
  return context;
};
