module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: false,
      },
    ],
  ],
  sourceType: 'unambiguous',
};
