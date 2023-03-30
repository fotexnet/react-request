import { AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import saveHeaders from './saveHeaders';

beforeAll(() => {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  const localStorageMock = (function() {
    let store: Record<string, unknown> = {};
    return {
      length: Object.entries(store).length,
      getAll: () => store,
      getItem: (key: string) => store[key],
      setItem: (key: string, value: unknown) => (store[key] = value),
      removeItem: (key: string) => delete store[key],
      clear: () => (store = {}),
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

beforeEach(() => {
  window.localStorage.clear();
});

describe('saveHeaders', () => {
  it('should save given headers in local storage if present', () => {
    const response = createResponse({ Authorization: 'some_token', OrderToken: 'some_other_token' });
    saveHeaders(response, ['Authorization', 'OrderToken']);
    expect(window.localStorage.getItem('Authorization')).toEqual('some_token');
    expect(window.localStorage.getItem('OrderToken')).toEqual('some_other_token');
  });
  it('should not save anything if no headers are given', () => {
    const response = createResponse({ Authorization: 'some_token', OrderToken: 'some_other_token' });
    saveHeaders(response, []);
    expect(window.localStorage.getItem('Authorization')).not.toBeDefined();
    expect(window.localStorage.length).toEqual(0);
  });
});

function createResponse(headers: RawAxiosRequestHeaders): AxiosResponse {
  return {
    data: null,
    status: 200,
    statusText: 'OK',
    headers,
    config: jest.fn().mockReturnValue({})(),
  };
}
