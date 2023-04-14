import qs from 'qs';
import { Dispatch, SetStateAction } from 'react';

export default class QueryBuilder {
  protected _params: ParamsType;
  protected _dispatch: Dispatch<SetStateAction<string>> | undefined;

  constructor(config?: QueryBuilderConfig) {
    this._params = { ...(config?.params || {}) };
    this._dispatch = config?.dispatch;
  }

  get params(): Readonly<ParamsType> {
    return Object.freeze({ ...this._params });
  }

  /**
   * Pushes a new key-value pair to the `filter` object
   * @param key
   * @param value
   * @returns the current `QueryBuilder` instance
   */
  public where(key: string, value: WhereInputType): this {
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
   * Transforms the `params` object to a string. This method is essential for the query!
   * @param config `qs` library configuration object merged with the `UrlConfig` type
   * @returns the query string with a leading '?'
   */
  public url({ shouldUpdateState = true, ...config }: qs.IStringifyOptions & UrlConfig = {}): string {
    const { filter, sort, include } = this._params;
    const queryParams = [
      qs.stringify({ filter }, { arrayFormat: 'comma', ...config }),
      qs.stringify({ sort }, { arrayFormat: 'comma', ...config }),
      qs.stringify({ include }, { arrayFormat: 'comma', ...config }),
    ];

    const query = queryParams.reduce((prev, curr) => {
      // if both prev and curr are falsy, then return prev ('') and continue
      if (!prev && !curr) return prev;
      // if prev is falsy, then it must be the first iteration, so return curr and continue
      if (!prev) return '?' + curr;
      // if curr is falsy, then return prev and continue
      if (!curr) return prev;
      // if prev and curr is truthy, then concatenate prev + curr
      return prev + '&' + curr;
    }, '');

    if (this._dispatch && shouldUpdateState) this._dispatch(query);
    return query;
  }

  /**
   * Destroys a subset of the `params` object based on the given key. If you do NOT provide a key, this will clear every entry!
   * @param filterType a key of the `params` object
   */
  public destroy(filterType?: keyof ParamsType): void {
    if (!filterType) {
      this._params = {};
      return;
    }
    this._params = (Object.getOwnPropertyNames(this._params) as (keyof ParamsType)[]).reduce((prev, curr) => {
      if (curr === filterType) return prev;
      return { ...prev, [curr]: this._params[curr] };
    }, {});
  }

  /**
   * Checks wheter or not the `params` object contains a given key or value
   * @param config
   * @returns `true` or `false`
   */
  public has(config: HasConfig): boolean {
    switch (config.type) {
      case 'filter':
        return this._hasFilter(config.key, config.value);
      case 'key':
        return this._hasValue('filter', config.value);
      default:
        return this._hasValue(config.type, config.value);
    }
  }

  /**
   * Removes a subset of the `params` object
   * @param config
   * @returns the current `QueryBuilder` instance
   */
  public remove(config: RemoveConfig): this {
    switch (config.type) {
      case 'filter':
        if (!this._params.filter) return this;
        this._params.filter[config.key] = this._params.filter[config.key].filter(x => x !== config.value);
        return this;
      case 'sort':
      case 'include':
        if (!this._params[config.type]) return this;
        this._params[config.type] = this._params[config.type]?.filter(x => x !== config.value) || [];
        return this;
      default:
        return this;
    }
  }

  /**
   * Removes a subset of the `params` object based on the key
   * @param key
   * @returns the current `QueryBuilder` instance
   */
  public removeFilter(key: string): this {
    if (!this._params.filter || !this._params.filter[key]) return this;

    const keys = Object.getOwnPropertyNames(this._params.filter);
    const filteredKeys = keys.filter(x => x !== key);

    const filters = filteredKeys.reduce((prev, curr) => {
      if (!this._params.filter) return prev;
      return { ...prev, [curr]: [...this._params.filter[curr]] };
    }, {});

    this._params = { ...this._params, filter: { ...filters } };
    return this;
  }

  protected _hasValue(filterType: keyof ParamsType, value: string): boolean {
    if (!this._params[filterType]) return false;
    const params =
      filterType === 'filter'
        ? Object.getOwnPropertyNames(this._params[filterType])
        : (this._params[filterType] as string[]);
    return params.includes(value);
  }

  protected _hasFilter(key: string, value: WhereInputType): boolean {
    if (!this._params.filter || !this._params.filter[key]) return false;
    return this._params.filter[key].includes(value);
  }
}

export type QueryBuilderConfig = {
  params?: ParamsType;
  dispatch?: Dispatch<SetStateAction<string>>;
};

export type ParamsType = {
  filter?: Record<string, WhereInputType[]>;
  sort?: string[];
  include?: string[];
};

export type WhereInputType = string | number | boolean | null;

export type HasConfig =
  | {
      type: 'key' | 'sort' | 'include';
      value: string;
    }
  | {
      type: 'filter';
      key: string;
      value: WhereInputType;
    };

export type RemoveConfig =
  | {
      type: 'sort' | 'include';
      value: string;
    }
  | {
      type: 'filter';
      key: string;
      value: string;
    };

export type UrlConfig = {
  shouldUpdateState?: boolean;
};
