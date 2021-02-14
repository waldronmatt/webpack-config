# Webpack Config

A shareable webpack configuration

## Introduction

My personal shareable webpack configuration for front end projects.

You can add and/or override defaults with your own configurations.

## File Configurations

### `webpack.dev.js`

#### Core Configs and Optimizations

- Configurations
  - mode: `development`
  - devtool: `inline-source-map`
  - optimizations for development builds

### `webpack.prod.js`

#### Core Configs and Minification

- Configurations
  - mode: `production`
  - devtool: `false`
  - minimize: `true`
- Plugins
  - terser-webpack-plugin (included with webpack)
  - css-minimizer-webpack-plugin
  - imagemin-webpack-plugin

### `webpack.common.js`

#### JS, CSS, Sass, Font, and Image Loaders and Output Configs

- Configurations
  - path
  - publicPath
  - filename
  - chunkFilename
  - asset/inline (images)
  - asset/resource (fonts)
- Plugins
  - mini-css-extract-plugin
- Loaders
  - babel-loader
  - css-loader
  - postcss-loader
  - sass-loader
  - style-loader
  - mini-css-extract-plugin (loader)

## Install

```bash
npm i --save-dev https://github.com/waldronmatt/webpack-config
```

## Usage

The setup assumes your configurations are split into dev, prod, and common configuration files.

```js
/
    scripts/
        webpack.common.js
        webpack.dev.js
        webpack.production.js
```

**`package.json`**

```js
"dev": "webpack serve --env development --config ./scripts/webpack.dev.js",
"build": "webpack --env production --config ./scripts/webpack.prod.js",
```

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
const extendWebpackBaseConfig = require('webpack-config');

const developmentConfig = {
    ...
};

module.exports = extendWebpackBaseConfig(commonConfig, developmentConfig);
```

**`webpack.production.js`**

```js
const commonConfig = require('./webpack.common.js');
const extendWebpackBaseConfig = require('webpack-config');

const productionConfig = {
    ...
};

module.exports = extendWebpackBaseConfig(commonConfig, productionConfig);
```

## Options

Use **`isProduction`** to check the current environment and apply some additional logic in `webpack.common.js`.

An example use case is to use `mini-css-extract-plugin` for production builds to extract css into separate files.

(Code is from this repo's configuration)

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
        plugins: [
            isProduction ? miniCssExtract() : false,
            ...
        ].filter(Boolean),
    }
};

module.exports = commonConfig;
```

The benefit to this approach is to keep 'locically grouped' configurations together.

In the example above, we are able to keep our loader configurations together in the same file.

## Notes

My personal preferences for webpack overrides when extending this library:

### Custom App:

### `webpack.dev.js`

#### Development Server Configs, HMR, and Linting Plugins

### `webpack.prod.js`

#### Code Splitting Optimizations (splitchunks, tree-shaking, etc)

### `webpack.common.js`

#### Entry Points & everything else (html-webpack-plugin, extra loaders, etc)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
