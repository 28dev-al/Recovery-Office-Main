module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      // MongoDB Playground files
      files: ['**/*.mongodb.js', '**/playground-*.js', '**/playground-*.mongodb.js'],
      env: {
        mongo: true,
        node: true,
      },
      globals: {
        use: 'readonly',
        db: 'readonly',
        ObjectId: 'readonly',
        ISODate: 'readonly',
        NumberLong: 'readonly',
        NumberInt: 'readonly',
        NumberDecimal: 'readonly',
        BinData: 'readonly',
        UUID: 'readonly',
        MD5: 'readonly',
        HexData: 'readonly',
        DBRef: 'readonly',
        Timestamp: 'readonly',
        MinKey: 'readonly',
        MaxKey: 'readonly',
      },
      rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
      },
    },
  ],
}; 