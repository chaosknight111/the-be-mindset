module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'no-shadow': 'off',
    'default-case': 'off',
    'consistent-return': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
