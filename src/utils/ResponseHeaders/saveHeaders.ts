import { AxiosResponse } from 'axios';

/**
 * Saves response headers to the browsers local storage based on the given keys
 * @param response response object
 * @param keys header names (case-sensitive)
 */
function saveHeaders(response: AxiosResponse, keys: string[]): void {
  if (typeof window === 'undefined') return;
  for (const key in response.headers) {
    if (!keys.includes(key)) continue;
    window.localStorage.setItem(key, response.headers[key]);
  }
}

export default saveHeaders;
