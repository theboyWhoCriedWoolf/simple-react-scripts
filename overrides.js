require("./config/env");

const fs = require("fs");
const path = require("path");
const program = require("commander");

program
  .version("0.1.0")
  .option("-o, --overridePath", "Overrides Paths")
  .option("-dt, --disableType", "Ignore typescript")
  .parse(process.argv);

const projectDir = path.resolve(fs.realpathSync(process.cwd()));
const overridesPath = `${projectDir}/${program.overrides ||
  "config-overrides.js"}`;

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
