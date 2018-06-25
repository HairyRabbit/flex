/**
 * @jest
 */

import fs from 'fs'
import path from 'path'
import { execSync as exec } from 'child_process'
import webpack from 'webpack'

test.skip('should use as webpack loader', (done) => {
  exec('npm run build')
  webpack({
    mode: 'development',
    entry: path.resolve('mocks/index.js'),
    devtool: 'source-map',
    output: {
      path: path.resolve('mocks'),
      filename: 'style.output.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [{
        test: /\.flex$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1',
          path.resolve('style-loader.js')
        ]
      }]
    }
  }, (err, stats) => {
    expect(
      require(path.resolve('./mocks/style.output.js')).default
    ).not.toEqual(
      null
    )

    done()
  })
})

test.skip('should use as webpack loader', (done) => {
  exec('npm run build')
  webpack({
    mode: 'development',
    entry: path.resolve('mocks/jsx.js'),
    devtool: 'source-map',
    output: {
      path: path.resolve('mocks'),
      filename: 'jsx.output.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [{
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }, {
        test: /\.flex$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1',
          path.resolve('style-loader.js')
        ]
      }]
    }
  }, (err, stats) => {
    expect(
      require(path.resolve('./mocks/jsx.output.js')).default
    ).not.toEqual(
      null
    )

    done()
  })
})
