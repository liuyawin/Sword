module.exports = (name, env, dirname) => {
    let entry = {};
    entry[name] = dirname + '/src/index.js';

    return entry;
}