# Webpack Config

A shareable webpack configuration

## Introduction

My personal shareable webpack configuration for front end projects that support `.js`, `.css`, `.scss`, font, and image files.

You can add and/or override defaults with your own configurations.

## Install

```bash
npm i --save-dev @waldronmatt/webpack-config
```

Install additional packages to meet project and loader requirements:

**`webpack`**

```bash
npm i --save-dev webpack webpack-cli webpack-merge
```

**`babel-loader`**

```bash
npm i --save-dev @babel/preset-env @babel/runtime @babel/plugin-transform-runtime
```

## Usage

**`package.json`**

```bash
"dev": "webpack --env development --config webpack.dev.js",
"build": "webpack --env production --config webpack.prod.js",
```

\
**`webpack.common.js`**

```js
const commonConfig = (isProduction) => {
    ...
};

module.exports = commonConfig;
```

\
**`webpack.dev.js`**

```js
const commonConfig = require('./webpack.common.js');
const extendWebpackBaseConfig = require('@waldronmatt/webpack-config');

const developmentConfig = {
    ...
};

module.exports = extendWebpackBaseConfig(commonConfig, developmentConfig);
```

\
**`webpack.production.js`**

```js
const commonConfig = require('./webpack.common.js');
const extendWebpackBaseConfig = require('@waldronmatt/webpack-config');

const productionConfig = {
    ...
};

module.exports = extendWebpackBaseConfig(commonConfig, productionConfig);
```

## Options

Use **`isProduction`** to check the current environment and apply some conditional logic in `webpack.common.js`.

The benefit to this approach is to keep 'locically grouped' configurations together:

**`webpack.common.js`**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = (isProduction) => {

    const styleLoaders = [
        {
          loader: isProduction
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
        },
        ...
    ];

    return {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: styleLoaders,
          },
          ...
        ],
      },
    }
};

module.exports = commonConfig;
```

## File Configurations

A detailed look at what is included:

### `webpack.dev.js`

- Defaults
  - mode: `development`
  - devtool: `inline-source-map`
  - minimize: `false`
  - optimizations for development builds

### `webpack.prod.js`

- Defaults
  - mode: `production`
  - devtool: `false`
  - minimize: `true`
- Plugins
  - `terser-webpack-plugin` (included with webpack)
  - `css-minimizer-webpack-plugin`
  - `imagemin-webpack-plugin`

### `webpack.common.js`

- Defaults
  - publicPath: `/`
  - filename: `isProduction ? '[name].[contenthash:8].js' : '[name].js',`
  - chunkFilename: `isProduction ? '[name].[contenthash:8].js' : '[name].js',`
- Plugins
  - `mini-css-extract-plugin`
- Loaders
  - `babel-loader`
  - `css-loader`
  - `postcss-loader` (with `autoprefixer`)
  - `sass-loader` (depends on `sass` and `dart-sass`)
  - `style-loader`
  - `mini-css-extract-plugin.loader`
  - `asset/inline` (images)
  - `asset/resource` (fonts)

## Notes

My personal preferences for custom webpack configurations when extending this library:

### Custom App:

**`webpack.dev.js`** - Development Server Configurations and Linting Plugins

**`webpack.prod.js`** - Code Splitting Optimizations (splitchunks, tree-shaking, etc.)

**`webpack.common.js`** - Entry Points, Output Path Resolution, and Misc. (html-webpack-plugin, extra loaders, etc.)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
