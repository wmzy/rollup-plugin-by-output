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
import plugins, {file} from 'rollup-plugin-by-output';


export default {
  // ...
  plugins: plugins(babel(), [file(pkg.browser), terser()]),
  output: [
    {
      globals: {
        lodash: '_'
      },
      name: pkg.name,
      file: pkg.browser,
      format: 'umd'
    },
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

## What

Rollup support multiple outputs with the same input. But sometime we want to apply different plugins for these outputs.
The most common scenario is apply the [terser](https://github.com/TrySound/rollup-plugin-terser) plugin for a minify bundle.
Before we can write a config array, but there are a lot of duplicate code and operations.

This plugin (maybe not a plugin) gives you a slightly elegant and efficient solution for this scene.

## APIs

```js
import plugins, {when, whenAll, prop, format, file} from 'rollup-plugin-by-output';
```

### Plugins

```js
{
  //...
  plugins: [pluginA, when(filter, pluginB), pluginsC, ..., ...whenAll(anotherFilter, pluginD, pluginE)]
}
```

same as:

```js 
{
  // ...
  plugins: plugins(pluginA,
    [filter, pluginB],// same as when
    pluginsC, ..., 
    [anotherFilter, pluginD, pluginE] // same as whenAll and flat
  )
}
```

The filter is a predicate function, the parameter is an output config object. If the filter return a truthy value, the rest plugins will be apply for the output.

`when` and `whenAll` is convenient for few filters and `plugins` is convenient for multiple filters.

### Filter helpers

There are three [simple](https://github.com/wmzy/rollup-plugin-by-output/blob/master/src/index.js#L53) but useful filter helpers: `prop`, `format`, `file`.

With them you can write like:
```js 
// output 
[
  {
    name: pkg.name,
    file: pkg.browser,
    format: 'umd'
    }
]

when(format('umd'), pluginA)
// same as
when(format(/^umd$/), pluginA)
// same as
when(format(f => f === 'umd'), pluginA)

when(file(pkg.browser), pluginA)

format = filter => prop('format', filter)
file = filter => prop('file', filter)
```

## Examples

* [lib-starter](https://github.com/wmzy/lib-starter/blob/master/rollup.config.js)

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
## License

MIT
