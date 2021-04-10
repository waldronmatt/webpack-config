const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = isProduction => {
  /* 
    because css and sass files share similar loader configs,
    let's build it here and call it
  */
  const styleLoaders = [
    {
      loader: isProduction
        ? // extracts the compiled css from js (overrides default behavior)
          MiniCssExtractPlugin.loader
        : // inject CSS into the DOM
          'style-loader',
    },
    // interprets import and url like import/require and will resolve them
    {
      loader: 'css-loader',
    },
    // enables autoprefixer and next-gen CSS polyfill features
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
      // specifies the public URL of the output directory via a browser
      publicPath: '/',
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      // specify chunck path for code splitted files
      chunkFilename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
    },
    // change defaults to accept other file types
    resolve: {
      extensions: ['.js', '.ts', 'jsx', '.tsx', '.json'],
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
          test: /\.(js|ts)$/,
          enforce: 'pre',
          use: [
            /* 
              useful when using 3rd-party libraries
              having their own source maps
            */
            {
              loader: 'source-map-loader',
            },
          ],
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
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
              options: {
                // improve the build time
                transpileOnly: true,
                experimentalWatchApi: true,
              },
            },
          ],
        },
        // exports a data URI of the asset. Previously url-loader
        {
          test: /\.(jpe?g|png|gif|svg|webp)$/,
          type: 'asset/inline',
        },
        // emits a separate file and exports the URL. Previously file-loader
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
        },
        /*
          process files as a string. Previously file-loader
          Usage: import myModule from 'my-module?raw';
        */
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
      ],
    },
    plugins: [isProduction ? miniCssExtract() : false].filter(Boolean),
    optimization: {
      /*
        The value 'single' instead creates a runtime file
        to be shared for all generated chunks.
        https://webpack.js.org/guides/caching/#extracting-boilerplate

        Required to get multiple entry chunks to hmr with webpack-dev-server
        https://github.com/webpack/webpack-dev-server/issues/2792
      */
      runtimeChunk: 'single',
    },
  };
};

module.exports = commonConfig;
