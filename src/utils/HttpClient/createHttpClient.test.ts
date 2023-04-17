import createHttpClient from './createHttpClient';

describe('createHttpClient', () => {
  it('should return a client', () => {
    const { client } = createHttpClient();
    expect(client).toBeDefined();
  });

  it('should create a client with 1 request interceptor', () => {
    const { outgoingRequestInterceptors } = createHttpClient({
      outgoingRequestInterceptors: [{ onFulfilled: config => ({ ...config }) }],
    });
    expect(outgoingRequestInterceptors).toBeDefined();
    expect(outgoingRequestInterceptors?.length).toEqual(1);
  });

  it('should create a client with multiple request interceptors', () => {
    const { outgoingRequestInterceptors } = createHttpClient({
      outgoingRequestInterceptors: [
        { onFulfilled: config => ({ ...config }) },
        { onFulfilled: config => ({ ...config }) },
        { onFulfilled: config => ({ ...config }) },
      ],
    });
    expect(outgoingRequestInterceptors).toBeDefined();
    expect(outgoingRequestInterceptors?.length).toEqual(3);
  });

  it('should create a client with 1 response interceptor', () => {
    const { incomingRequestInterceptors } = createHttpClient({
      incomingRequestInterceptors: [{ onFulfilled: response => ({ ...response }) }],
    });
    expect(incomingRequestInterceptors).toBeDefined();
    expect(incomingRequestInterceptors?.length).toEqual(1);
  });

  it('should create a client with multiple response interceptors', () => {
    const { incomingRequestInterceptors } = createHttpClient({
      incomingRequestInterceptors: [
        { onFulfilled: response => ({ ...response }) },
        { onFulfilled: response => ({ ...response }) },
        { onFulfilled: response => ({ ...response }) },
      ],
    });
    expect(incomingRequestInterceptors).toBeDefined();
    expect(incomingRequestInterceptors?.length).toEqual(3);
  });
});
