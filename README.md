- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Package contents](#package-contents)
  - [Components](#components)
    - [Spinner](#spinner)
  - [Hooks](#hooks)
    - [QueryBuilder](#querybuilder)
      - [`where(key: string, value: WhereInputValue) => QueryBuilder`](#wherekey-string-value-whereinputvalue--querybuilder)
      - [`sort(value: string, order: 'asc' | 'desc') => QueryBuilder`](#sortvalue-string-order-asc--desc--querybuilder)
      - [`include(value: string) => QueryBuilder`](#includevalue-string--querybuilder)
      - [`url(config: qs.IStringifyOptions & UrlConfig) => string`](#urlconfig-qsistringifyoptions--urlconfig--string)
      - [destroy](#destroy)
      - [has](#has)
      - [remove](#remove)
      - [removeFilter](#removefilter)
    - [QueryFunction](#queryfunction)
    - [MutationFunction](#mutationfunction)
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

### QueryBuilder

Creates a query string based on an object which you can populate and manipulate by using any of the following methods:

#### `where(key: string, value: WhereInputValue) => QueryBuilder`

Pushes a new key-value pair to the `filter` object and returns the current `QueryBuilder` instance.

- Can be used multiple times in a row
- Can use same values over and over, it will add to the string multiple times like this: `?a=1&a=1&a=1`

#### `sort(value: string, order: 'asc' | 'desc') => QueryBuilder`

Pushes a new key-value pair to the `sort` object and returns the current `QueryBuilder` instance.

- Cannot repeat keys!

#### `include(value: string) => QueryBuilder`

Pushes a new key-value pair to the `include` object and returns the current `QueryBuilder` instance.

- Cannot repeat keys!

#### `url(config: qs.IStringifyOptions & UrlConfig) => string`

Transforms the container object to a string. This method is essential for the query!
Return the query string with a leading `?`.

**NOTE**: If you do NOT call this method, you will NOT get a query string at all!

#### destroy

#### has

#### remove

#### removeFilter

### QueryFunction

Creates a query function for the `react-query` package. Takes two arguments, `config` and `callback`.

| Argument   | Required | Description                                                                                                              |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `config`   | Yes      | Uses generic type created from `AxiosRequestConfig` to tell `react-query` what type of data to expect from the function. |
| `callback` | No       | Consumes the context of the `useQuery` hook and returns a new `config`                                                   |

### MutationFunction

## Higher-order components

### withLoading

### withRoleGuard
