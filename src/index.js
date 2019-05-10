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

  Object.keys(rest).forEach(k => {
    const wrapper = wrappers[k];
    if (!wrapper) {
      throw new Error(`[rollup-plugin-by-output] not support plugin: ${name}`);
    }

    plugin[k] = wrapper(filter, plugin[k]);
  });

  return plugin;
}

export function whenAll(filter, plugins) {
  return plugins.map(p => when(filter, p));
}

export default function plugins(...pluginList) {
  return pluginList.map(plugin => {
    if (!Array.isArray(plugin)) return plugin;
    return when(...plugin);
  });
}
