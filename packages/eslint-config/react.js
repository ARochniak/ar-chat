module.exports = {
  extends: [
    './index.js',
  ],
  plugins: [
    'tailwindcss',
    'react',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'error',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^api'],
          ['^~?'],
          ['^\\.\\.(?!/?$imports)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'react/jsx-sort-props': [
      'warn',
      {
        shorthandLast: true,
        reservedFirst: true,
      },
    ],
    'tailwindcss/classnames-order': ['warn', { config: 'tailwind-config/index.js' }],
  },
}
