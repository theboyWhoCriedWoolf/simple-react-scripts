process.env.NODE_ENV = process.env.NODE_ENV || "development";

const pathsStr = "../config/paths";
const devServerConfigPath = "../config/webpackDevServer.config.js";

const overrides = require("../overrides");
const libs = require("../libs");
const paths = require(pathsStr);

// override paths first
// this allows to override paths
// before they enter the webpack config
const cachedPaths = (require.cache[
  require.resolve(pathsStr)
].exports = overrides.paths(
  Object.assign(paths, { disableTypescript: overrides.disableTypescript })
));

/**
 * Script executed before all
 * other scripts to create and cache overrides
 * within require cache
 */
const params = {
  ...libs,
  paths: cachedPaths
};

// load webpack configs

let webpackConfig;
let webpackConfigPath;
if (process.env.NODE_ENV === "development") {
  webpackConfigPath = "../config/webpack.config.dev";
  webpackConfig = require(webpackConfigPath);
} else {
  webpackConfigPath = "../config/webpack.config.prod";
  webpackConfig = require(webpackConfigPath);
}

// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports = overrides.webpack(
  webpackConfig,
  process.env.NODE_ENV,
  params
);

// devServer
const devServerConfig = require(devServerConfigPath);
// override config in memory
require.cache[
  require.resolve(devServerConfigPath)
].exports = overrides.devServer(devServerConfig, process.env.NODE_ENV, params);
