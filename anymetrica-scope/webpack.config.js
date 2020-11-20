// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (webpackConfig) => {
  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push([
    'import', {
      libraryName: 'antd',
      style: 'css',
    }
  ]);
  webpackConfig.babel.plugins.push([
    'import', {
      libraryName: 'antd',
      style: 'less',
    }
  ]);
  webpackConfig.plugins = [
    ...(webpackConfig.plugins || []),
    new CopyWebpackPlugin(
      [
        {
          from: 'public/audio/',
          to: 'build/static/audio',
        },
      ],
      { copyUnmodified: true },
    ),
  ];
  return webpackConfig;
};
