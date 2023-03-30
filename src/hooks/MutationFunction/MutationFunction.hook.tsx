import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useQueryClient } from 'react-query';

/**
 * Creates a mutation function for `react-query`
 * @param method applicable values are - `POST`, `PUT`, `DELETE`. Used for mutations
 * @param factory defines the config for the mutation
 * @returns a `mutation` function and an `invalidate` function which can be used to invalidate previous queries based on the query key
 */
function useMutationFunction<TResponse, TVariables = unknown>(
  method: Extract<Method, 'POST' | 'PUT' | 'DELETE'>,
  factory: (variables: TVariables) => Omit<AxiosRequestConfig, 'method'>
): UseMutationFunctionResult<TResponse, TVariables> {
  const queryClient = useQueryClient();
  return {
    mutation: (variables: TVariables) => axios.request({ method, ...factory(variables) }),
    invalidate: (key: string) => queryClient.invalidateQueries(key),
  };
}

export default useMutationFunction;

export type UseMutationFunctionResult<TResponse, TVariables> = {
  mutation: (variables: TVariables) => Promise<AxiosResponse<TResponse>>;
  invalidate: (key: string) => void;
};
