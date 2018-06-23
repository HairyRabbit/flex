import path from 'path'
import {
  EnvironmentPlugin,
  ContextReplacementPlugin
} from 'webpack'

export default ['style-loader', 'jsx-loader', 'index'].map(input => {
  return {
    mode: process.env.NODE_ENV,
    target: 'node',
    node: false,
    devtool: 'source-map',
    entry: path.resolve(`src/${input}.js`),
    output: {
      path: path.resolve('.'),
      filename: `${input}.js`,
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [{
        test: /.js$/,
        use: 'babel-loader'
      }]
    },
    plugins: [
      new EnvironmentPlugin({
        NODE_ENV: false,
        DEBUG: false
      })
    ],
    externals: [

    ]
  }
})
