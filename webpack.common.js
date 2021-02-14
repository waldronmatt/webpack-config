const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = (isProduction) => {
  // because css and sass files share similar loader configs, let's build it here and call it
  const styleLoaders = [
    {
      loader: isProduction
        ? // extracts the compiled css from js (overrides default Webpack behavior)
          MiniCssExtractPlugin.loader
        : // inject CSS into the DOM
          'style-loader',
    },
    // interprets import and url like import/require and will resolve them
    {
      loader: 'css-loader',
    },
    /*
      loader for webpack to process css with PostCSS
      postcss-loader should be placed after css-loader and style-loader,
      but before other preprocessor loaders like e.g sass|less|stylus-loader
      https://github.com/webpack-contrib/postcss-loader#config-cascade
    */
    {
      loader: 'postcss-loader',
    },
  ];

  const miniCssExtract = () => {
    // where the compiled scss is saved to
    return new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    });
  };

  return {
    output: {
      // specifies the public URL of the output directory when referenced in a browser.
      publicPath: '/',
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      // specify chunck path for code splitted files
      chunkFilename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: styleLoaders,
        },
        {
          test: /\.scss$/,
          use: styleLoaders.concat([
            // loads a sass/scss file and compiles it to css
            {
              loader: 'sass-loader',
            },
          ]),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        // asset/inline exports a data URI of the asset. Previously achievable by using url-loader
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/,
          type: 'asset/inline',
        },
        // asset/resource emits a separate file and exports the URL. Previously achievable by using file-loader
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [isProduction ? miniCssExtract() : false]
      // remove empty elements from config (a.k.a. miniCssExtract in dev mode)
      .filter(Boolean),
  };
};

module.exports = commonConfig;
