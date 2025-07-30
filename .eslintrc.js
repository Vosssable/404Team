module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    'packages/server/dist/',
    'packages/client/dist/',
    'dist/',
    'dev-dist/',
    'node_modules/',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          'React.FC': {
            message: 'Используйте явное определение пропсов вместо React.FC',
            fixWith: 'React.PropsWithChildren<Props>',
          },
          'React.FunctionComponent': {
            message:
              'Используйте явное определение пропсов вместо React.FunctionComponent',
            fixWith: 'React.PropsWithChildren<Props>',
          },
          'React.FunctionalComponent': {
            message:
              'Используйте явное определение пропсов вместо React.FunctionalComponent',
            fixWith: 'React.PropsWithChildren<Props>',
          },
        },
      },
    ],
  },
}
