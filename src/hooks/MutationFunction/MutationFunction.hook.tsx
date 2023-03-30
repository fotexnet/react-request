import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useQueryClient } from 'react-query';

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
