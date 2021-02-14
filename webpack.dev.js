const developmentConfig = {
  mode: 'development',
  // map your compiled code back to your original source code.
  devtool: 'inline-source-map',
  optimization: {
    // don't minimize so we can debug
    minimize: false,
    /*
      The value 'single' instead creates a runtime file to be shared for all generated chunks.
      https://github.com/webpack/webpack-dev-server/issues/2792
    */
    // creates an additional chunk for the runtime code, so it's cheap to generate
    runtimeChunk: 'single',
    // https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};

module.exports = developmentConfig;
