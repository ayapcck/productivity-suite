let config = {};

try {
    const secrets = require('./secrets.json');
    Object.assign(config, secrets);
} catch (err) {}

export default config;