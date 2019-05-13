import assert from 'assert';
import _ from 'lodash';

const wrappers = {
  outputOptions(filter, fn) {
    return function outputOptionsWrapper(outputOptions) {
      return filter(outputOptions) ? fn.call(this, outputOptions) : null;
    };
  },
  generateBundle(filter, fn) {
    return function generateBundleWraper(outputOptions, ...rest) {
      if (filter(outputOptions)) fn.call(this, outputOptions, ...rest);
    };
  },
  renderChunk(filter, fn) {
    return function renderChunkWrapper(code, chunk, outputOptions) {
      return filter(outputOptions)
        ? fn.call(this, code, chunk, outputOptions)
        : null;
    };
  }
};

export function when(filter, plugin) {
  const {name, ...rest} = plugin;

  return {
    name,
    ..._.mapValues(rest, (v, k) => {
      const wrapper = wrappers[k];
      assert(wrapper, `not support plugin: ${name} - ${k}`);

      return wrapper(filter, v);
    })
  };
}

export function whenAll(filter, plugins) {
  return plugins.map(p => when(filter, p));
}

export default function plugins(...pluginList) {
  return _.flatMap(pluginList, plugin => {
    if (!_.isArray(plugin)) return plugin;

    const [filter, plugins] = plugin;
    return _.isArray(plugins)
      ? whenAll(filter, plugins)
      : when(filter, plugins);
  });
}

export function prop(key, filter) {
  if (_.isString(filter)) return out => out[key] === filter;
  if (_.isRegExp(filter)) return out => filter.test(out[key]);
  if (_.isFunction(filter)) return out => filter(out[key]);

  throw new Error('not support filter type');
}

export function format(filter) {
  return prop('format', filter);
}

export function file(filter) {
  return prop('file', filter);
}
