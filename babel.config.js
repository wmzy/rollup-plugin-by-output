const pkg = require('./package');

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          node: pkg.engines.node
        }
      }
    ]
  ]
};
