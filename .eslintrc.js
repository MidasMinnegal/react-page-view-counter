module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  parser: '@babel/eslint-parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    babelOptions: {
      parserOpts: {
        plugins: ['jsx'],
      },
    },
    requireConfigFile: false,
  },
  rules: {
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    // Default props is getting deprecated in newer versions of React
    'react/require-default-props': 'off',
  },
  globals: {
    window: true,
    localStorage: true,
  },
}
