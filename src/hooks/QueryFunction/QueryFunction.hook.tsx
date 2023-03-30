import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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
    const requestConfig = callback ? { ...config, ...callback(context as TContext) } : config;
    return axios.request({ ...requestConfig, signal });
  };
}

export default useQueryFunction;

export type UseQueryFunctionConfig<TData> = Omit<AxiosRequestConfig<TData>, 'signal'>;
