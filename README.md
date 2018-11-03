# simple-react-scripts

Based on [react-app-rewired](https://github.com/timarney/react-app-rewired) and [react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts), _simple-react-scripts_ provides the absolute barebones webpack and scripts configuration as used by [Create React App](https://github.com/facebook/create-react-app/).

This package is designed to help you configure and use _Create React App's_ webpack configuration and scripts, allowing you to quickly get started without having to set up any webpack configuration yourself.

Just like [react-app-rewired](https://github.com/timarney/react-app-rewired) it is completely configurable.

> This is a simplified version of react-scripts, containing only webpack and build scripts. It will **not** automatically generate Jest or Eslint configuration for you.

---

##Quick start

```js
npm i -D simple-react-scripts

yarn add simple-react-scripts --dev
```

## Running your application

Just like _react-scripts_, to run your aplication all you need to do is add `simple-react-scripts` to your package.json's scripts commands.

```js
// package.json
{
    "scripts": {
        "start": "simple-react-scripts start",
        "build": "simple-react-scripts build"
        "test": "simple-react-scripts start"
    }
}
```

##Overriding configurations

_simple-react-scripts_ will automatically look for a file called `config-overrides.js` at your project's root, which allows you to mutate the configuration.

To use an alternative path, just supply this using `--overridesPath=path/to/your/config.js` in your package.json scripts.

###Overriding webpack

```js
// config-overrides.js
module.exports = (webpackConfig, env, libs) => {
  return webpackConfig;
};
```

###Overriding paths
All paths used within _simple-react-scripts_ can be overridden. To do this just create method _(as illustrated below)_ within your overrides file.

If a path method is specified, it will be executed before any webpack overrides. This will allow your webpack configuration to be executed with your updated paths.

To override paths, add the following:

```js
// config-overrides.js
module.exports.paths = (paths, env) => {
  paths.indexJs = "your/new/script/path";
  return paths;
};

// make sure webpack is written as
module.exports.webpack = (webpackConfig, env, libs) => webpackConfig;
// and NOT as
// to prevent overriding the above method
module.exports = (webpackConfig, env, libs) => webpackConfig;
```

##Libs & Helpers
This package was created with simplicity and flexibility in mind. The idea of libs is to provide access to additional helpers that will aid in overriding your webpack configuration.

At the moment, only `withoutLint` is available. If you want to add any additional helpers, please feel free to submit a [Pull Request](https://github.com/theboyWhoCriedWoolf/simple-react-scripts/pulls).

```js
// config-overrides.js
module.exports = (webpackConfig, env, { paths, withoutLint }) => {
  return withoutLint(webpackConfig);
};
```

## Disabling typescript

This is a feature added specifically to turn off typescript. This comes in handy if you are using typescript for your server, but you dont want the webpack configuration to use typescript for your UI code.

Using this, you can disable typescript really easily:

```js
// package.json
{
    "scripts": {
        "start": "simple-react-scripts --disableType",
    }
}
```

---

## Further documentation

This package is based on scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation for any help to understand what configurations are available:

- [Getting Started](https://github.com/facebook/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
- [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

---
