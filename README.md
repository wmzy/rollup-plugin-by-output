[![Build Status](https://travis-ci.org/wmzy/rollup-plugin-by-output.svg?branch=master)](https://travis-ci.org/wmzy/rollup-plugin-by-output)
[![Coverage Status](https://coveralls.io/repos/github/wmzy/rollup-plugin-by-output/badge.svg?branch=master)](https://coveralls.io/github/wmzy/rollup-plugin-by-output?branch=master)
# rollup-plugin-by-output

> Apply Rollup Plugin by OutputOptions

## Install

```bash
npm i -D rollup-plugin-by-output
```

## Usage

```bash
// rollup.config.js
import babel from 'rollup-plugin-babel';
import terser from 'rollup-plugin-terser';
import plugins from 'rollup-plugin-by-output';


export default {
  // ...
  plugins: plugins(babel(), [o => (o.file === pkg.browser), terser()]),
  output: {
    globals: {
      lodash: '_'
    },
    name: pkg.name,
    file: pkg.browser,
    format: 'umd'
  },
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ]
};

```

## Workflow

```bash
# develop
npm start

# build
npm run build

# test
npm test

# commit changes
npm run commit

# publish
npm publish
```
