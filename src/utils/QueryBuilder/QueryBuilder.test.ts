import QueryBuilder from './QueryBuilder';

describe('QueryBuilder class', () => {
  it('should build a query', () => {
    const qb = new QueryBuilder();

    const query = qb
      .where('name', 'John')
      .sort('created_at', 'desc')
      .include('user')
      .url({ encode: false });
    const matches = numberOfMatches(query, '&');

    expect(query).toContain('filter[name]=John');
    expect(query).toContain('sort=-created_at');
    expect(query).toContain('include=user');
    expect(query.startsWith('?')).toBeTruthy();
    expect(matches).toBe(2);
  });

  it('should check if query has given value', () => {
    const qb = new QueryBuilder();
    qb.where('name', 'John')
      .where('name', 'Doe')
      .sort('created_at', 'desc');

    expect(qb.has({ use: 'param', config: { type: 'filter', for: 'key', value: 'name' } })).toBeTruthy();
    expect(qb.has({ use: 'param', config: { type: 'filter', for: 'key', value: 'age' } })).toBeFalsy();
    expect(qb.has({ use: 'param', config: { type: 'filter', for: 'value', value: 'John' } })).toBeTruthy();
    expect(qb.has({ use: 'param', config: { type: 'filter', for: 'value', value: 'Doe' } })).toBeTruthy();
    expect(qb.has({ use: 'param', config: { type: 'filter', for: 'value', value: 'Jane' } })).toBeFalsy();
    expect(qb.has({ use: 'param', config: { type: 'sort', value: '-created_at' } })).toBeTruthy();
    expect(qb.has({ use: 'param', config: { type: 'sort', value: 'updated_at' } })).toBeFalsy();
    expect(qb.has({ use: 'param', config: { type: 'include', value: 'user' } })).toBeFalsy();
  });

  it('should destroy query params', () => {
    const qb = new QueryBuilder();

    const query = qb
      .where('name', 'John')
      .where('name', 'Doe')
      .sort('created_at', 'desc')
      .url({ encode: false });
    const matches = numberOfMatches(query, '&');
    expect(query).toContain('filter[name]=John,Doe');
    expect(query).toContain('sort=-created_at');
    expect(query.startsWith('?')).toBeTruthy();
    expect(matches).toBe(1);

    const newQuery = qb.sort('age', 'asc').url({ encode: false });
    const newMatches = numberOfMatches(query, '&');
    expect(newQuery).toContain('filter[name]=John,Doe');
    expect(newQuery).toContain('sort=-created_at,age');
    expect(newQuery.startsWith('?')).toBeTruthy();
    expect(newMatches).toBe(1);

    qb.destroy();
    const finalQuery = qb.where('name', 'John').url({ encode: false });
    const finalMatches = numberOfMatches(finalQuery, '&');
    expect(finalQuery).not.toContain('Doe');
    expect(finalQuery).not.toContain('sort');
    expect(finalQuery).not.toContain('-created_at');
    expect(finalQuery).not.toContain('age');
    expect(finalQuery).toContain('filter[name]=John');
    expect(finalQuery.startsWith('?')).toBeTruthy();
    expect(finalMatches).toBe(0);
  });

  it('should destroy a single query param', () => {
    const qb = new QueryBuilder();

    const query = qb
      .where('name', 'John')
      .where('name', 'Doe')
      .sort('created_at', 'desc')
      .url({ encode: false });
    const matches = numberOfMatches(query, '&');
    expect(query).toContain('filter[name]=John,Doe');
    expect(query).toContain('sort=-created_at');
    expect(query.startsWith('?')).toBeTruthy();
    expect(matches).toBe(1);

    qb.destroy('filter');
    const newQuery = qb.url({ encode: false });
    const newMatches = numberOfMatches(newQuery, '&');
    expect(newQuery).not.toContain('filter[name]');
    expect(newQuery).not.toContain('John');
    expect(newQuery).not.toContain('Doe');
    expect(newQuery).toContain('sort=-created_at');
    expect(newQuery.startsWith('?')).toBeTruthy();
    expect(newMatches).toBe(0);
  });

  it("should remove a key from 'filter'", () => {
    const qb = new QueryBuilder();

    const query = qb
      .where('name', 'John')
      .where('name', 'Doe')
      .where('age', 25)
      .url({ encode: false });
    const matches = numberOfMatches(query, '&');
    expect(query).toContain('filter[name]=John,Doe');
    expect(query).toContain('filter[age]=25');
    expect(query.startsWith('?')).toBeTruthy();
    expect(matches).toBe(1);

    const newQuery = qb.remove({ use: 'param', config: { type: 'filter', key: 'name' } }).url({ encode: false });
    const newMatches = numberOfMatches(newQuery, '&');
    expect(newQuery).not.toContain('filter[name]=John,Doe');
    expect(newQuery).toContain('filter[age]=25');
    expect(newQuery.startsWith('?')).toBeTruthy();
    expect(newMatches).toBe(0);
  });

  it('should remove a value from a query param', () => {
    const qb = new QueryBuilder();

    const query = qb
      .where('name', 'John')
      .where('name', 'Doe')
      .where('age', 25)
      .sort('age', 'asc')
      .url({ encode: false });
    const matches = numberOfMatches(query, '&');
    expect(query).toContain('filter[name]=John,Doe');
    expect(query).toContain('filter[age]=25');
    expect(query).toContain('sort=age');
    expect(query.startsWith('?')).toBeTruthy();
    expect(matches).toBe(2);

    const newQuery = qb
      .remove({ use: 'param', config: { type: 'filter', key: 'name', value: 'John' } })
      .url({ encode: false });
    const newMatches = numberOfMatches(newQuery, '&');
    expect(newQuery).not.toContain('John');
    expect(newQuery).toContain('filter[name]=Doe');
    expect(newQuery).toContain('filter[age]=25');
    expect(newQuery).toContain('sort=age');
    expect(newQuery.startsWith('?')).toBeTruthy();
    expect(newMatches).toBe(2);
  });

  it('should create custom filters', () => {
    const qb = new QueryBuilder();

    const query = qb
      .custom('page', 2)
      .custom('per_page', 10)
      .custom('enabled', true)
      .custom('enabled', false)
      .url({ encode: false });
    const matches = numberOfMatches(query, '&');
    expect(query).toContain('page=2');
    expect(query).toContain('per_page=10');
    expect(query.startsWith('?')).toBeTruthy();
    expect(matches).toBe(2);
    expect(qb.params).toMatchObject({ enabled: [true, false] });
  });

  it('should remove custom filters', () => {
    const qb = new QueryBuilder();

    const query = qb
      .custom('page', 2)
      .custom('per_page', 10)
      .custom('enabled', true)
      .custom('enabled', false)
      .url({ encode: false });
    const matches = numberOfMatches(query, '&');
    expect(query).toContain('page=2');
    expect(query).toContain('per_page=10');
    expect(query.startsWith('?')).toBeTruthy();
    expect(matches).toBe(2);
    expect(qb.params).toMatchObject({ enabled: [true, false] });

    const newQuery = qb
      .remove({ use: 'custom', config: { key: 'enabled', value: false } })
      .remove({ use: 'custom', config: { key: 'page', value: 2 } })
      .url({ encode: false });
    const newMatches = numberOfMatches(newQuery, '&');
    expect(newQuery).toContain('enabled=true');
    expect(newQuery).not.toContain('page=2');
    expect(newQuery.startsWith('?')).toBeTruthy();
    expect(newMatches).toBe(1);
  });
});

function numberOfMatches(str: string, value: string): number {
  let count: number = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== value) continue;
    count++;
  }
  return count;
}
