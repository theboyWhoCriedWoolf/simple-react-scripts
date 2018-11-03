require("./config/env");

const fs = require("fs");
const path = require("path");
const program = require("commander");

program
  .version("1.0.6")
  .option("-o, --overridesPath [path]", "Overrides Root")
  .option("-dt, --disableType", "Ignore typescript")
  .parse(process.argv);

const configName = "config-overrides.js";
const appDirectory = fs.realpathSync(process.cwd());

// resolve the application path
const resolveApp = relativePath =>
  path.resolve(appDirectory, relativePath, configName);

const overridesPath = resolveApp(program.overridesPath || "");
const override = fs.existsSync(overridesPath) ? require(overridesPath) : {};

const webpack =
  typeof override === "function"
    ? override
    : override.webpack || ((config, env) => config);

const paths =
  typeof override.paths === "function" ? override.paths : paths => paths;

const devServer =
  override.devServer ||
  (configFunction => (proxy, allowedHost) =>
    configFunction(proxy, allowedHost));

// normalized overrides functions
module.exports = {
  webpack,
  paths,
  devServer,
  disableTypescript: program.disableType
};
