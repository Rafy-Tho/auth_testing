import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^next$' }],
      'no-console': 'warn',
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },
];
