module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  settings: {
    react: { version: 'detect' },
  },
  globals: {
    __DEV__: 'readonly',
    require: 'readonly',
  },
  rules: {
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
  },
};
