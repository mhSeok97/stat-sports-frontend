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
  style: {
    sass: {
      loaderOptions: (sassLoaderOptions, { env, paths }) => {
        return sassLoaderOptions
      },
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
