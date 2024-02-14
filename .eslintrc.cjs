module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      //   // 'vue/multi-word-component-names': ['error', { ignores: ['index', 'default'] }],
      //   // 'vue/max-attributes-per-line': [
      //   //   'warn',
      //   //   {
      //   //     singleline: { max: 1 },
      //   //     multiline: { max: 1 },
      //   //   },
      //   // ],
      //   // 'space-before-function-paren': [
      //   //   'error',
      //   //   {
      //   //     anonymous: 'never',
      //   //     named: 'never',
      //   //     asyncArrow: 'never',
      //   //   },
      //   // ],
      //   // 'vue/singleline-html-element-content-newline': 0,
      // },
    ],
  },
  //   semi: [1, "always"],
  //   "comma-dangle": [1, "always-multiline"],
  //   "vue/multi-word-component-names": ["error", { ignores: ["index", "default"] }],
  //   "vue/max-attributes-per-line": [
  //     "warn",
  //     {
  //       singleline: { max: 1 },
  //       multiline: { max: 1 },
  //     },
  //   ],
  //   "space-before-function-paren": [
  //     "error",
  //     {
  //       anonymous: "never",
  //       named: "never",
  //       asyncArrow: "never",
  //     },
  //   ],
  //   "vue/singleline-html-element-content-newline": 0,
  // },
};
