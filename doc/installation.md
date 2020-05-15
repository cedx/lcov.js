# Installation

## Requirements
Before installing **LCOV Reports for JS**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.
    
You can verify if you're already good to go with the following commands:

```shell
node --version
# v14.2.0

npm --version
# 6.14.4
```

!!! info
    If you plan to play with the package sources, you will also need
    [PowerShell](https://docs.microsoft.com/en-us/powershell) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material).

## Installing with npm package manager

### 1. Install it
From a command prompt, run:

```shell
npm install @cedx/lcov
```

### 2. Import it
Now in your [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) code, you can use:

```js
import * as lcov from '@cedx/lcov';
```

## Installing from a content delivery network
This library is also available as a ready-made bundle.
To install it, add this code snippet to the `<head>` of your HTML document:

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@cedx/lcov/build/lcov.min.js"></script>

<!-- UNPKG -->
<script src="https://unpkg.com/@cedx/lcov/build/lcov.min.js"></script>
```

The classes of this library are exposed as `lcov` property on the `window` global object:

```html
<script>
  const {Record, Report, ...} = window.lcov;
</script>
```
