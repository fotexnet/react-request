import { useMemo, useState } from 'react';
import QueryBuilder from '../../utils/QueryBuilder/QueryBuilder';

/**
 * Returns an instance of the `QueryBuilder` class
 * @returns the `query` and the `params` object as well as every method of the `QueryBuilder` class
 */
function useQueryBuilder(): UseQueryBuilder {
  const [query, setQuery] = useState<string>('');
  const qb = useMemo(() => new QueryBuilder({ dispatch: setQuery }), []);

  // TODO: write test for qb.params
  return {
    query,
    params: qb.params,
    url: qb.url.bind(qb),
    where: qb.where.bind(qb),
    include: qb.include.bind(qb),
    sort: qb.sort.bind(qb),
    custom: qb.custom.bind(qb),
    has: qb.has.bind(qb),
    remove: qb.remove.bind(qb),
    destroy: qb.destroy.bind(qb),
  };
}

export default useQueryBuilder;

export type UseQueryBuilder = {
  query: string;
} & Omit<QueryBuilder, '_params' | '_dispatch'>;
