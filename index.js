const { merge } = require('webpack-merge');
const baseCommonConfig = require('./src/webpack.common.js');
const baseDevelopmentConfig = require('./src/webpack.dev.js');
const baseProductionConfig = require('./src/webpack.prod.js');

// export a function for apps to extend in their `webpack.config.js` files
const extendWebpackBaseConfig = (commonConfig, environmentConfig) => (env) => {
  const isProduction = env.production === true;
  const baseEnvironmentConfig = isProduction ? baseProductionConfig : baseDevelopmentConfig;

  // merge our base configs and per-app overrides.
  return merge(
    baseCommonConfig(isProduction),
    baseEnvironmentConfig,
    // custom configs will override
    commonConfig(isProduction),
    environmentConfig
  );
};

module.exports = extendWebpackBaseConfig;
