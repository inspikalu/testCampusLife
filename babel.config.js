module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['./'],
          alias: {
            assets: './assets',
            components: './components',
            utils: './utils',
          },
        },
      ],
    ],
  };
};
