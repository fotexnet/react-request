- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Package contents](#package-contents)
  - [Components](#components)
    - [Spinner](#spinner)
  - [Hooks](#hooks)
    - [useQueryBuilder](#usequerybuilder)
      - [Populate](#populate)
      - [Manipulate](#manipulate)
      - [Types](#types)
    - [useQueryFunction](#usequeryfunction)
    - [useMutationFunction](#usemutationfunction)
  - [Higher-order components](#higher-order-components)
    - [withLoading](#withloading)
    - [withRoleGuard](#withroleguard)

# Prerequisites

1. You must use Node 14 or higher
2. In your project, you must have react installed since react is a peer dependency (16 or higher)
3. Create a [Personal Access Token (classic)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-personal-access-token-classic)
4. Select `repo`, `workflow`, `write:packages` and `delete:packages` scopes
5. Setup a global `~/.npmrc` file with the following line where `TOKEN` equals to your PAT you just created: `//npm.pkg.github.com/:_authToken=TOKEN`

# Installation

1. In your project, setup a local `.npmrc` file with the following line: `@fotexnet:registry=https://npm.pkg.github.com`
2. Install the package using `yarn add @fotexnet/react-request`

# Package contents

## Components

### Spinner

## Hooks

### useQueryBuilder

This hook is created from the utility class `QueryBuilder` which creates and manages the state of the query. Create a string by calling the `url` method at the end of each statement. Since you can chain different type of methods, a statement ends at the end of the chain.

#### Populate

| method    | signature                                               | chainable | repeated keys | description                                                                                          |
| --------- | ------------------------------------------------------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------- |
| `where`   | `(key: string, value: WhereInputValue) => QueryBuilder` | Yes       | Yes           | Pushes a new key-value pair to the `filter` object and returns the current `QueryBuilder` instance.  |
| `sort`    | `(key: string, order: 'asc', 'desc') => QueryBuilder`   | Yes       | No            | Pushes a new key-value pair to the `sort` object and returns the current `QueryBuilder` instance.    |
| `include` | `(key: string) => QueryBuilder`                         | Yes       | No            | Pushes a new key-value pair to the `include` object and returns the current `QueryBuilder` instance. |
| `url`     | `(config: qs.IStringifyOptions & UrlConfig) => string`  | No        | -             | Creates a query string. If you do NOT call this method, you will NOT get a query string at all!      |

#### Manipulate

| method         | signature                                 | chainable | description                                                                                                                 |
| -------------- | ----------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `destroy`      | `(filterType?: keyof ParamsType) => void` | No        | Destroys a subset of the container object based on the given key. If you do NOT provide a key, this will clear every entry! |
| `remove`       | `(config: RemoveConfig) => QueryBuilder`  | Yes       | Removes a value of an entry and returns the current `QueryBuilder` instance.                                                |
| `removeFilter` | `(key: string) => QueryBuilder`           | Yes       | Removes an entry of the `filter` object based on the key and returns the current `QueryBuilder` instance.                   |
| `has`          | `(config: HasConfig) => boolean`          | No        | Checks wheter or not the container object contains a given key or value                                                     |

#### Types

**WhereInputValue**

Possible values are `'string', 'number', 'boolean', 'null'`

**ParamsType**

| property  | type           | required | description                                                                                               |
| --------- | -------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `filter`  | `object`       | No       | query conditions, key-value pairs where keys are the column names and values are type of `WhereInputType` |
| `sort`    | `string array` | No       | keys of the columns to be sorted by                                                                       |
| `include` | `string array` | No       | names of the models to be included                                                                        |

**UrlConfig**

| property            | type      | default | required | description                                                                                              |
| ------------------- | --------- | ------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `shouldUpdateState` | `boolean` | `true`  | No       | determines if the query state should update (useful for evading duplicate updaates in `useEffect` hooks) |

**HasConfig**

| property | type                                 | default | description                                                                                            |
| -------- | ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------ |
| `type`   | `'key', 'filter', 'sort', 'include'` | -       | key in the container object (`'key'` is a special type that searches in the `filter` object for a key) |
| `value`  | `string | WhereInputType`            | -       | value to find                                                                                          |
| `key`    | `string`                             | -       | key in the `filter` object (only accessible if `type` set to `filter`)                                 |

**RemoveConfig**

| property | type                          | default | description                                                            |
| -------- | ----------------------------- | ------- | ---------------------------------------------------------------------- |
| `type`   | `'filter', 'sort', 'include'` | -       | key in the container object                                            |
| `value`  | `string`                      | -       | value to remove                                                        |
| `key`    | `string`                      | -       | key in the `filter` object (only accessible if `type` set to `filter`) |

### useQueryFunction

Creates a query function for the `react-query` package. Takes two arguments, `config` and `callback`. Returns a function.

| argument   | type                                                            | required | description                                                            |
| ---------- | --------------------------------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `config`   | `UseQueryFunctionConfig<TData>`                                 | Yes      | initial config                                                         |
| `callback` | `(context: TContext) => Partial<UseQueryFunctionConfig<TData>>` | No       | consumes the context of the `useQuery` hook and returns a new `config` |

**UseQueryFunctionConfig**: `Omit<AxiosRequestConfig<TData>, 'signal'>`

### useMutationFunction

Creates a mutation function for `react-query` package. Returns an object containing two functions: `mutation` and `invalidate`.

| argument  | type                                                            | required | description                                          |
| --------- | --------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| `method`  | `'POST', 'PUT', 'DELETE'`                                       | Yes      | mutation method                                      |
| `factory` | `(variables: TVariables) => Omit<AxiosRequestConfig, 'method'>` | Yes      | consumes the variables to create a mutation function |

## Higher-order components

### withLoading

### withRoleGuard
