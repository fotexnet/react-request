import qs from 'qs';
import { Dispatch, SetStateAction } from 'react';

export default class QueryBuilder {
  protected _params: ParamsType;
  protected _custom: Record<string, unknown[]>;
  protected _dispatch: Dispatch<SetStateAction<string>> | undefined;

  constructor(config?: QueryBuilderConfig) {
    this._params = { ...(config?.params || {}) };
    this._custom = {};
    this._dispatch = config?.dispatch;
  }

  get params(): Readonly<ParamsType> {
    return Object.freeze({ ...this._params, ...this._custom });
  }

  /**
   * Pushes a new key-value pair to the `filter` object
   * @param key
   * @param value
   * @returns the current `QueryBuilder` instance
   */
  public where(key: string, value: QueryValue): this {
    const filtersObj = this._params.filter || {};
    const context = filtersObj[key] || [];
    const filter = { [key]: [...context, value] };
    this._params = { ...this._params, filter: { ...filtersObj, ...filter } };
    return this;
  }

  /**
   * Pushes a new key-value pair to the `sort` object
   * @param key
   * @param value
   * @returns the current `QueryBuilder` instance
   */
  public sort(key: string, order: 'asc' | 'desc'): this {
    const newValue = order === 'asc' ? key : `-${key}`;
    this._params = { ...this._params, sort: [...(this._params.sort || []), newValue] };
    return this;
  }

  /**
   * Pushes a new key-value pair to the `include` object
   * @param key
   * @param value
   * @returns the current `QueryBuilder` instance
   */
  public include(key: string): this {
    this._params = { ...this._params, include: [...(this._params.include || []), key] };
    return this;
  }

  /**
   * Pushes a new key-value pair to the `params` object
   * @param key
   * @param value
   * @returns the current `QueryBuilder` instance
   */
  public custom(key: string, value: QueryValue): this {
    if (!this._custom[key]) this._custom[key] = [value];
    else this._custom[key].push(value);
    return this;
  }

  /**
   * Transforms the `params` object to a string. This method is essential for the query!
   * @param config `qs` library configuration object merged with the `UrlConfig` type
   * @returns the query string with a leading '?'
   */
  public url({
    shouldPrefix = true,
    shouldUpdateState = true,
    ...config
  }: qs.IStringifyOptions & UrlConfig = {}): string {
    let query: string = qs.stringify({ ...this._params, ...this._custom }, { arrayFormat: 'comma', ...config });

    if (shouldPrefix) query = '?' + query;
    if (this._dispatch && shouldUpdateState) this._dispatch(query);

    return query;
  }

  /**
   * Destroys a subset of the `params` object based on the given key. If you do NOT provide a key, this will clear every entry!
   * @param key a key of the `params` object
   */
  public destroy(key?: string): void {
    if (!key) {
      this._params = {};
      this._custom = {};
      return;
    }

    const filterByKey = (obj: Record<string, unknown>) => {
      return Object.getOwnPropertyNames(obj).reduce((prev, curr) => {
        if (curr === key) return prev;
        return { ...prev, [curr]: obj[curr] };
      }, {});
    };

    this._params = filterByKey(this._params);
    this._custom = filterByKey(this._custom);
  }

  /**
   * Checks wheter or not the `params` object contains a given key or value
   * @param config
   * @returns `true` or `false`
   */
  public has(config: HasConfig): boolean {
    if (config.use === 'param') {
      return this._hasParam(config.config);
    }

    return this._hasCustomParam(config.config);
  }

  /**
   * Removes a subset of the values on the `params` object
   * @param config
   * @returns the current `QueryBuilder` instance
   */
  public remove(config: RemoveConfig): this {
    if (config.use === 'param') {
      return this._removeParam(config.config);
    }

    return this._removeCustomParam(config.config);
  }

  protected _hasCustomParam(config: HasCustomConfig): boolean {
    if (config.for === 'key') return Object.getOwnPropertyNames(this._custom).includes(config.value);

    for (const key in this._custom) {
      if (this._custom[key].includes(config.value)) return true;
    }

    return false;
  }

  protected _hasParam(config: HasParamConfig): boolean {
    if (config.type === 'filter') {
      if (!this._params.filter) return false;
      if (config.for === 'key') return Object.getOwnPropertyNames(this._params.filter).includes(config.value);

      for (const key in this._params.filter) {
        if (this._params.filter[key].includes(config.value)) return true;
      }
    }

    const array = this._params[config.type];
    if (!array) return false;

    return Array.isArray(array) && typeof config.value === 'string' && array.includes(config.value);
  }

  protected _removeCustomParam(config: RemoveCustomConfig): this {
    if (Object.getOwnPropertyNames(this._custom).includes(config.key)) {
      this._custom[config.key] = this._custom[config.key].filter(value => value !== config.value);
      if (this._custom[config.key].length === 0) delete this._custom[config.key];
    }

    return this;
  }

  protected _removeParam(config: RemoveParamConfig): this {
    if (config.type === 'filter' && !!this._params.filter) {
      if (config.value !== undefined) {
        this._params.filter[config.key] = this._params.filter[config.key].filter(value => value !== config.value);
      }
      if (config.value === undefined || this._params.filter[config.key].length === 0) {
        delete this._params.filter[config.key];
      }
    }

    if (config.type !== 'filter') {
      if (!!this._params[config.type]) {
        this._params[config.type] = this._params[config.type]?.filter(value => value !== config.value);
      }
      if (this._params[config.type]?.length === 0) {
        delete this._params[config.type];
      }
    }

    return this;
  }
}

export type QueryBuilderConfig = {
  params?: ParamsType;
  dispatch?: Dispatch<SetStateAction<string>>;
};

export type ParamsType = {
  filter?: Record<string, QueryValue[]>;
  sort?: string[];
  include?: string[];
};

export type QueryValue = string | number | boolean | null;

export type HasConfig = { use: 'param'; config: HasParamConfig } | { use: 'custom'; config: HasCustomConfig };
export type HasCustomConfig = { for: 'key'; value: string } | { for: 'value'; value: QueryValue };
export type HasParamConfig =
  | ({ type: 'filter' } & ({ for: 'key'; value: string } | { for: 'value'; value: QueryValue }))
  | { type: 'include' | 'sort'; value: string };

export type RemoveConfig = { use: 'param'; config: RemoveParamConfig } | { use: 'custom'; config: RemoveCustomConfig };
export type RemoveCustomConfig = { key: string; value: QueryValue };
export type RemoveParamConfig =
  | { type: 'filter'; key: string; value?: QueryValue }
  | { type: 'include' | 'sort'; value: string };

export type UrlConfig = {
  shouldPrefix?: boolean;
  shouldUpdateState?: boolean;
};
