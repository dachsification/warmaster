module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'no-console': 'off',
    'prettier/prettier': ['error'],
  },
};
