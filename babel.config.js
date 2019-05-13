const pkg = require('./package');

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          node: pkg.engines.node.slice(2)
        }
      }
    ]
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: true
            }
          }
        ]
      ]
    }
  }
};
