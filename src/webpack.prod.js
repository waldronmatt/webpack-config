const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const productionConfig = {
  mode: 'production',
  // disable for efficient prod builds and code reduction
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      /* 
        for webpack@5 you can use the `...` syntax
        to extend existing minimizers (i.e. `terser-webpack-plugin`)
      */
      '...',
      new CssMinimizerPlugin(),
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    ],
  },
  performance: {
    hints: 'warning',
  },
};

module.exports = productionConfig;
