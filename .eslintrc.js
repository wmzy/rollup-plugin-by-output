module.exports = {
  root: true,
  env: {
      "browser": true,
      "node": true,
      "commonjs": true,
      "es6": true
  },
  plugins: ['prettier'],
  extends: [
    'airbnb-base',
    'eslint-config-prettier'
  ],
  rules: {
    'prettier/prettier': ['error'],
    'no-return-assign': ['error', 'except-parens'],
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': ["error", { "functions": false }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
