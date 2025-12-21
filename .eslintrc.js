module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  plugins: ['import'],
  rules: {
    // Limit maximum line length
    'max-len': [
      'error',
      { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true },
    ],

    // Import order
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node "builtin" modules
          'external', // External packages
          'internal', // Internal modules
          ['parent', 'sibling', 'index'], // Relative imports
        ],
        'newlines-between': 'always', // enforce newlines between groups
        alphabetize: { order: 'asc', caseInsensitive: true }, // sort alphabetically
      },
    ],
  },
};
