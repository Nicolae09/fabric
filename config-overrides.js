const aliases = require('./src/config/aliases');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.alias,
            ...aliases
        }
    };
    return config;
};
