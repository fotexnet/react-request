# Table of content

- [Table of content](#table-of-content)
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

The `withLoading` higher-order component uses this as the loading indicator component.

**SpinnerProps**

| property      | type     | required | default     | description                                   |
| ------------- | -------- | -------- | ----------- | --------------------------------------------- |
| `color`       | `string` | No       | `steelblue` | sets the color of the spinner stripes         |
| `width`       | `number` | No       | `300`       | dimensions of the spinner container in pixels |
| `stripeWidth` | `number` | No       | `15`        | width of spinner stripes in pixels            |

## Hooks

### useQueryBuilder

This hook is created from the utility class `QueryBuilder` which creates and manages the state of the query. Create a string by calling the `url` method at the end of each statement. Since you can chain different type of methods, a statement ends at the end of the chain.

#### Populate

| method    | signature                                              | chainable | repeated keys | description                                                                                          |
| --------- | ------------------------------------------------------ | --------- | ------------- | ---------------------------------------------------------------------------------------------------- |
| `where`   | `(key: string, value: QueryValue) => QueryBuilder`     | Yes       | Yes           | Pushes a new key-value pair to the `filter` object and returns the current `QueryBuilder` instance.  |
| `sort`    | `(key: string, order: 'asc', 'desc') => QueryBuilder`  | Yes       | No            | Pushes a new key-value pair to the `sort` object and returns the current `QueryBuilder` instance.    |
| `include` | `(key: string) => QueryBuilder`                        | Yes       | No            | Pushes a new key-value pair to the `include` object and returns the current `QueryBuilder` instance. |
| `custom`  | `(key: string, value: QueryValue) => QueryBuilder`     | Yes       | Yes           | Pushes a new key-value pair to the `params` object and returns the current `QueryBuilder` instance.  |
| `url`     | `(config: qs.IStringifyOptions & UrlConfig) => string` | No        | -             | Creates a query string. If you do NOT call this method, you will NOT get a query string at all!      |

#### Manipulate

| method    | signature                                 | chainable | description                                                                                                                 |
| --------- | ----------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `destroy` | `(filterType?: keyof ParamsType) => void` | No        | Destroys a subset of the container object based on the given key. If you do NOT provide a key, this will clear every entry! |
| `remove`  | `(config: RemoveConfig) => QueryBuilder`  | Yes       | Removes a value of an entry and returns the current `QueryBuilder` instance.                                                |
| `has`     | `(config: HasConfig) => boolean`          | No        | Checks wheter or not the container object contains a given key or value                                                     |

#### Types

**QueryValue**

Possible values are `'string', 'number', 'boolean', 'null'`

**ParamsType**

| property  | type           | required | description                                                                                               |
| --------- | -------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `filter`  | `object`       | No       | query conditions, key-value pairs where keys are the column names and values are type of `WhereInputType` |
| `sort`    | `string array` | No       | keys of the columns to be sorted by                                                                       |
| `include` | `string array` | No       | names of the models to be included                                                                        |

**UrlConfig**

| property            | type      | default | required | description                                                                                             |
| ------------------- | --------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `shouldPrefix`      | `boolean` | `true`  | No       | determines if the query state should be prefixed with `?`                                               |
| `shouldUpdateState` | `boolean` | `true`  | No       | determines if the query state should update (useful for evading duplicate updates in `useEffect` hooks) |

**HasConfig**

| property | type                                 | default | description                                                                             |
| -------- | ------------------------------------ | ------- | --------------------------------------------------------------------------------------- |
| `use`    | `param`, `custom`                    | -       | `params` is for `filter`, `include` and `sort`. `custom` is for a custom key-value pair |
| `config` | `HasParamConfig` , `HasCustomConfig` | -       | -                                                                                       |

**HasParamConfig**

| property | type                        | default | description                                                                   |
| -------- | --------------------------- | ------- | ----------------------------------------------------------------------------- |
| `type`   | `filter`, `include`, `sort` | -       | key in `params` object                                                        |
| `for`    | `key` , `value`             | -       | specify which value you want to modify (only available if `type` is `filter`) |
| `value`  | `string` , `QueryValue`     | -       | value for the search                                                          |

**HasCustomConfig**

| property | type                    | default | description                                                                                |
| -------- | ----------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `for`    | `key` , `value`         | -       | specify which value you want to modify (can be anything excep `filter`, `include`, `sort`) |
| `value`  | `string` , `QueryValue` | -       | value for the search                                                                       |

**RemoveConfig**

| property | type                                       | default | description                                                                             |
| -------- | ------------------------------------------ | ------- | --------------------------------------------------------------------------------------- |
| `use`    | `param`, `custom`                          | -       | `params` is for `filter`, `include` and `sort`. `custom` is for a custom key-value pair |
| `config` | `RemoveParamConfig` , `RemoveCustomConfig` | -       | -                                                                                       |

**RemoveParamConfig**

| property | type                        | default | description                                                                |
| -------- | --------------------------- | ------- | -------------------------------------------------------------------------- |
| `type`   | `filter`, `include`, `sort` | -       | key in `params` object                                                     |
| `key`    | `string`                    | -       | key of the value you want to remove (only available if `type` is `filter`) |
| `value`  | `string` , `QueryValue`     | -       | value to remove                                                            |

**RemoveCustomConfig**

| property | type         | default | description                                                                             |
| -------- | ------------ | ------- | --------------------------------------------------------------------------------------- |
| `key`    | `string`     | -       | key of the value you want to remove (can be anything excep `filter`, `include`, `sort`) |
| `value`  | `QueryValue` | -       | value to remove                                                                         |

### useQueryFunction

Creates a query function for the `react-query` package. Takes two arguments, `config` and `callback`. Returns a function.

| argument   | type                                                            | required | description                                                            |
| ---------- | --------------------------------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `config`   | `UseQueryFunctionConfig<TData>`                                 | Yes      | initial config                                                         |
| `callback` | `(context: TContext) => Partial<UseQueryFunctionConfig<TData>>` | No       | consumes the context of the `useQuery` hook and returns a new `config` |

**UseQueryFunctionConfig**: `Omit<AxiosRequestConfig<TData>, 'signal'>`

```tsx
function Component(props: { id?: string }) {
  const fn = useQueryFunction<ResponseType, { id?: string }>({ baseURL: 'your_api_url' }, context => ({
    url: context.id,
  }));
  const query = useQuery(['your_query_key', { id: props?.id }], fn);
}

// ResponseType is YOUR api response data structure
```

### useMutationFunction

Creates a mutation function for `react-query` package. Returns an object containing two functions: `mutation` and `invalidate`.

| argument  | type                                                            | required | description                                          |
| --------- | --------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| `method`  | `'POST', 'PUT', 'DELETE'`                                       | Yes      | mutation method                                      |
| `factory` | `(variables: TVariables) => Omit<AxiosRequestConfig, 'method'>` | Yes      | consumes the variables to create a mutation function |

```tsx
function Component(props: { id?: string }) {
  const request = useMutationFunction<ResponseType, { payload: any }>('POST', variables => ({
    url: 'your_api_url',
    data: variables.payload,
  }));
  const mutation = useMutation({ mutationFn: request.mutation, onSuccess: () => request.invalidate('your_query_key') });
}

// ResponseType is YOUR api response data structure
```

## Higher-order components

### withLoading

Creates a new component which takes an `isLoading` property in addition to it's existing properties. The new component will load the loading indicator if the `isLoading` property is set to `true`. You can customize this indicator through the `spinnerProps` argument (check out the [Spinner](#spinner) component for more information).

```tsx
withLoading(YourComponent, { color: '#bb703c', strokeWidth: 25 });
```

Or you can add your own loading indicator:

```tsx
withLoading(YourComponent, { CustomLoadingIndicator: <YourLoadingIndicator /> });
```

Then you can call your `NewComponent` like this:

```tsx
function Page() {
  // other stuff here..
  return <NewComponent isLoading={true} />;
}
```

### withRoleGuard
