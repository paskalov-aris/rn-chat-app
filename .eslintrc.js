const OFF = 0;
const WARN = 1;
const ERROR = 2;

const REACT_RULES = {
  'react/react-in-jsx-scope': OFF,
  'react-hooks/exhaustive-deps': ERROR,
  'react/jsx-curly-brace-presence': [
    WARN,
    { props: 'never', children: 'never' },
  ],
  'react/no-unstable-nested-components': WARN,
  'react-native/no-color-literals': OFF,
  'react-native/sort-styles': OFF,
};

const ESLINT_RULES = {
  'no-shadow': OFF,
  'no-empty-function': ERROR,
  'no-console': [ERROR, { allow: ['warn', 'error'] }],
};

const TYPESCRIPT_RULES = {
  '@typescript-eslint/no-unused-vars': [
    ERROR,
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-var-requires': OFF,
  '@typescript-eslint/no-explicit-any': ERROR,
  '@typescript-eslint/ban-ts-comment': ERROR,
  '@typescript-eslint/no-shadow': ERROR,
};

const PRETTIER_RULES = {
  'prettier/prettier': ERROR,
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    'import',
    'prettier',
  ],
  rules: {
    ...ESLINT_RULES,
    ...REACT_RULES,
    ...TYPESCRIPT_RULES,
    ...PRETTIER_RULES,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
