const path = require("path")
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin');
module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },
  mode: 'development',
  resolveLoader: {
    modules: ['node-modules', './loader']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'replaceLoader',
          {
          loader: 'replaceLoaderAsync',
          options: {
            str: 'my-loader'
          }
        }]
      }
    ]
  },
  plugins: [
    new CopyrightWebpackPlugin({
      name: "MyPlugin"
    })
  ]
}