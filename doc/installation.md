# Installation

## Requirements
Before installing **LCOV Reports for JS**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.

!!! warning
    LCOV Reports for JS requires Node.js >= **8.11.0**.
    
You can verify if you're already good to go with the following commands:

```shell
node --version
# v10.0.0

npm --version
# 5.6.0
```

!!! info
    If you plan to play with the package sources, you will also need
    [Gulp](https://gulpjs.com) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material).

## Installing with npm package manager

### 1. Install it
From a command prompt, run:

```shell
npm install @cedx/lcov
```

### 2. Import it
Now in your [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) code, you can use:

```js
const lcov = require('@cedx/lcov');
```
