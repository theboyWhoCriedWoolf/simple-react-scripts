# simple-react-scripts

Based on [react-app-rewired](https://github.com/timarney/react-app-rewired) and [react-scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts). Providing the absolute barebones webpack and scripts configuration as used by [Create React App](https://github.com/facebook/create-react-app/).

This package is designed to help you use _Create React App's_ webpack configuration and scripts. Allowing you to override andquickly get started without having to set up any webpack scripts yourself.

Completely configurable. Just like [react-app-rewired](https://github.com/timarney/react-app-rewired) you are able to extend all paths and webpack configuration.

> This will **not** automatically generate Jest or Eslint configuration for you. You will have to setup those configurations yourself. Which means you have more control and customization.

---

##Quick start

```js
npm i -D simple-react-scripts

yarn add simple-react-scripts --dev
```

## Running your application

Just like _react-scripts_, to run your aplication all you need to do is add `simple-react-scripts` to your package.json's scripts commands.

```js
{
    "scripts": {
        "start": "simple-react-scripts start",
        "build": "simple-react-scripts build"
        "test": "simple-react-scripts start"
    }
}
```

##Overriding configurations

_simple-react-scripts_ will automatically look for a file called `config-overrides.js` at your projects root, which allows you to mutate the configuration.

If you want to store this file somewhere else, just pass in `--overridePath=path/to/your/config.js`.

###Overriding webpack

```js
module.exports = (webpackConfig, env, libs) => {
  return webpackConfig;
};
```

###Overriding paths
Path overrides are called before webpacks, which means you can override just the paths and webpack will use this new configuration.

If you wish to override paths within the application, in your `config-overrides.js` add:

```js
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

##Libs
A libs object is passed into each override method. This object contains paths and helper methods to help mutate webpack's config. _Kind of like utils_.

```js
module.exports = (webpackConfig, env, { paths, withoutLint }) => {
  return withoutLint(webpackConfig);
};
```

At the moment, the only helper method is _withoutLint_. The reason for this is to create something really simple yet completely configurable by the user.
If you want to add any specific libs and extend this library, then please do so and simply raise a PR.

## Preventing typescript

This is a feature added specifically to turn off typescript. The reason for this as you may be using typescript for your server but you dont want the webpack configuration to use typescript for your UI code.

Using this, you can disable typescript really easily:

```js
{
    "scripts": {
        "start": "simple-react-scripts --disableType",
    }
}
```

---

This package is based on scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app).<br>
Please refer to its documentation for any help understanding what configurations are available:

- [Getting Started](https://github.com/facebook/create-react-app/blob/master/README.md#getting-started) – How to create a new app.
- [User Guide](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with Create React App.

---
