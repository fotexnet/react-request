import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryFunctionContext } from 'react-query';

interface IRequest<TData, TContext extends Record<string, unknown>> {
  (context: QueryFunctionContext<[string, TContext] | string>): Promise<AxiosResponse<TData>>;
}

/**
 * Creates a query function for `react-query`
 * @param config initial configuration for the client
 * @param callback function for processing `useQuery` dependencies. Returns a client configuration
 * @returns a `query` function
 */
function useQueryFunction<TData, TContext extends Record<string, unknown> = Record<string, unknown>>(
  config: UseQueryFunctionConfig<TData>,
  callback?: (context: TContext) => Partial<UseQueryFunctionConfig<TData>>
): IRequest<TData, TContext> {
  return ({ queryKey, signal }) => {
    const [, context] = queryKey;
    const { httpClient, ...httpConfig } = config;
    const requestConfig = callback ? { ...httpConfig, ...callback(context as TContext) } : httpConfig;
    const client = httpClient || axios;
    return client.request({ ...requestConfig, signal });
  };
}

export default useQueryFunction;

export type UseQueryFunctionConfig<TData> = Omit<AxiosRequestConfig<TData>, 'signal'> & { httpClient?: AxiosInstance };
