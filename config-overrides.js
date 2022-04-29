const { injectBabelPlugin } = require('react-app-rewired');

const rootImportConfig = [
  'root-import',
  {
    rootPathPrefix: 'src',
    rootPathSuffix: 'src',
  },
];

module.exports = (config) => injectBabelPlugin(rootImportConfig, config);
