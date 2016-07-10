const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: {
    main: './examples/routes'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/../examples/dist',
    library: 'example',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ts-loader!babel-loader'
      }
    ]
  }
}
