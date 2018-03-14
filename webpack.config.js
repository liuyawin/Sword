let webpack = require('webpack');
let path = require('path');
let getEntry = require('./webpack/get-entry');
let getOutput = require('./webpack/get-output');
let getLoaders = require('./webpack/get-loaders');
let getPlugins = require('./webpack/get-plugins');
let getResolve = require('./webpack/get-resolve');

let wpk = (name, env) => {
    let config = {};
    let dirname = path.join(__dirname, '/');

    config.entry = getEntry(name, env, dirname);
    config.output = getOutput(name, env, dirname);

    config.module = {
        rules: getLoaders(name, env, dirname)
    };

    config.resolve = getResolve(name, env, dirname);
    config.plugins = getPlugins(name, env, dirname);

    return config;
}

module.exports = wpk;