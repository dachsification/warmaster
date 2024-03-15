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
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: { max: 1 },
        multiline: { max: 1 },
      },
    ],
  },
};
