module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        regenerator: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          assets: './assets',
          resources: './resources',
          entities: './entities',
          data: './data',
          domain: './domain',
          presentation: './presentation',
        },
      },
    ],
  ],
};
