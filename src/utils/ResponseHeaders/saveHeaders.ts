import { AxiosResponse } from 'axios';

function saveHeaders(response: AxiosResponse, keys: string[]): void {
  if (typeof window === 'undefined') return;
  for (const key in response.headers) {
    if (!keys.includes(key)) continue;
    window.localStorage.setItem(key, response.headers[key]);
  }
}

export default saveHeaders;
