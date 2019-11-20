module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    'plugin:vue/strongly-recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    semi: [0, 'always'],
    quotes: [2, 'single', 'avoid-escape'],
    'prettier/prettier': 'warning',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
