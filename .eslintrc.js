module.exports = {
  root: true,
  env: {
    node: true
  },
<<<<<<< HEAD
  extends: ['plugin:vue/essential', '@vue/prettier'],
=======
  'extends': [
    'plugin:vue/essential',
    '@vue/prettier'
  ],
>>>>>>> dev
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
