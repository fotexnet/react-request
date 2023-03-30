import { useMemo, useState } from 'react';
import QueryBuilder from '../../utils/QueryBuilder/QueryBuilder';

/**
 * Returns an instance of the `QueryBuilder` class
 * @returns the `query` and the `params` object as well as every method of the `QueryBuilder` class
 */
function useQueryBuilder(): UseQueryBuilder {
  const [query, setQuery] = useState<string>('');
  const qb = useMemo(() => new QueryBuilder({ dispatch: setQuery }), []);

  return {
    query,
    params: qb.params,
    url: qb.url.bind(qb),
    include: qb.include.bind(qb),
    sort: qb.sort.bind(qb),
    where: qb.where.bind(qb),
    destroy: qb.destroy.bind(qb),
    remove: qb.remove.bind(qb),
    removeFilter: qb.removeFilter.bind(qb),
    has: qb.has.bind(qb),
  };
}

export default useQueryBuilder;

export type UseQueryBuilder = {
  query: string;
} & Omit<QueryBuilder, '_params' | '_dispatch'>;
