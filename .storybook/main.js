const custom = require('../webpack.config.js');

module.exports = {
  stories: ['../app/components/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    return {...config, module: {...config.module, rules: custom.module.rules} };
  },
};
