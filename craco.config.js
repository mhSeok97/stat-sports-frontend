const CracoAlias = require('craco-alias')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  webpack: {
    configure: (webpackConfig, {}) => {
      webpackConfig.plugins.push(
        new ESLintPlugin({
          extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
      )

      return webpackConfig
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
}
