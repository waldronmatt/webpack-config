# Webpack Config

A shareable webpack configuration

## Introduction

My personal shareable webpack configuration for front end projects.

You can add and/or override defaults with your own configurations.

## Features

- Load JavaScript, TypeScript, CSS, Sass, Font, and Image Files
- Optimization defaults for development builds
- Minification for production builds

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

The benefit to this approach is to keep 'locically grouped' configurations together.

## File Configurations

A detailed look at what is included:

### `webpack.dev.js`

- Defaults
  - mode: `development`
  - devtool: `inline-source-map`
  - minimize: `false`
  - performance hints: `false`
  - optimizations for development builds

### `webpack.prod.js`

- Defaults
  - mode: `production`
  - devtool: `false`
  - minimize: `true`
  - performance hints: `warning`
- Plugins
  - `terser-webpack-plugin` (included with webpack)
  - `css-minimizer-webpack-plugin`
  - `imagemin-webpack-plugin`

### `webpack.common.js`

- Defaults
  - publicPath: `/`
  - filename: `isProduction ? '[name].[contenthash:8].js' : '[name].js',`
  - chunkFilename: `isProduction ? '[name].[contenthash:8].js' : '[name].js',`
  - extensions: `['.js', '.ts', 'jsx', '.tsx', '.json'],`
  - runtimeChunk: `'single'`
- Plugins
  - `mini-css-extract-plugin` (for production builds)
- Loaders
  - `babel-loader`
  - `ts-loader`
  - `css-loader`
  - `postcss-loader` (with `autoprefixer`)
  - `sass-loader` (depends on `sass`)
  - `style-loader` (for development builds)
  - `mini-css-extract-plugin.loader` (for production builds)
  - `asset/inline` (images)
  - `asset/resource` (fonts)
  - `source-map-loader`

## Notes

My personal preferences for how I configure and group per-app custom configurations when extending this library:

**`webpack.dev.js`** - Development Server Configurations, Linting Plugins, Progress Output

**`webpack.prod.js`** - Code Splitting Optimizations (splitchunks, tree-shaking, etc.)

**`webpack.common.js`** - Entry Points, Output Path Resolution, HtmlWebpackPlugin Configurations, extra Plugins, and misc.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
