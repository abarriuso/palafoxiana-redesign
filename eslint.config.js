import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        performance: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        CustomEvent: 'readonly',
        IntersectionObserver: 'readonly',
        MutationObserver: 'readonly',
        Date: 'readonly',
        Math: 'readonly',
        Number: 'readonly',
        parseInt: 'readonly',
        JSON: 'readonly',
        Set: 'readonly',
        Map: 'readonly',
        Array: 'readonly',
        Object: 'readonly',
        String: 'readonly',
        Boolean: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['node_modules/**', 'assets/**', 'vendor/**', 'dist/**'],
  },
];
