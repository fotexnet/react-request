import axios, {
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  AxiosInterceptorManager,
  InternalAxiosRequestConfig,
} from 'axios';

export default function createHttpClient(config?: HttpClientConfig): HttpClientObject {
  const client = axios.create(config?.initialConfig);

  const outgoingRequestInterceptors = config?.outgoingRequestInterceptors?.map(({ onFulfilled, onRejected, options }) =>
    client.interceptors.request.use(onFulfilled, onRejected, options)
  );

  const incomingRequestInterceptors = config?.incomingRequestInterceptors?.map(({ onFulfilled, onRejected, options }) =>
    client.interceptors.response.use(onFulfilled, onRejected, options)
  );

  return { outgoingRequestInterceptors, incomingRequestInterceptors, client };
}

export type HttpClientObject = {
  outgoingRequestInterceptors?: number[];
  incomingRequestInterceptors?: number[];
  client: AxiosInstance;
};

export type HttpClientConfig<TOutgoingRequestData = unknown, TIncomingRequestData = unknown> = {
  initialConfig?: CreateAxiosDefaults<TOutgoingRequestData>;
  outgoingRequestInterceptors?: RequestInterceptor<InternalAxiosRequestConfig<TOutgoingRequestData>>[];
  incomingRequestInterceptors?: RequestInterceptor<AxiosResponse<TIncomingRequestData>>[];
};

type InterceptorArguments<TData = unknown> = Parameters<AxiosInterceptorManager<TData>['use']>;

export type RequestInterceptor<TData = unknown> = {
  onFulfilled?: InterceptorArguments<TData>[0];
  onRejected?: InterceptorArguments<TData>[1];
  options?: InterceptorArguments<TData>[2];
};
