- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Package contents](#package-contents)
  - [Components](#components)
    - [Spinner](#spinner)
  - [Hooks](#hooks)
    - [QueryFunction](#queryfunction)
    - [QueryBuilder](#querybuilder)
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

### QueryFunction

### QueryBuilder

### MutationFunction

## Higher-order components

### withLoading

### withRoleGuard
