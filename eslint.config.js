module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs'
    },
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    }
  },
  {
    files: ['loadtest/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        __ENV: 'readonly'
      }
    }
  }
];
