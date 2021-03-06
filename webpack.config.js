'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {};

config.devtool = 'sourcemap';
config.context = __dirname;

config.resolve = {
  root: __dirname,
  extensions: ['', '.ts', '.js', '.json', '.css', 'html']
};

config.entry = {
  vendor: [
    'zone.js',
    'reflect-metadata',
    '@angular/common',
    '@angular/core',
    '@angular/compiler',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    'lodash'
  ],
  'app': ['./index.ts', './demo/app.component.ts']
};

config.output = {
  path: path.join(__dirname, './build'),
  publicPath: '/',
  filename: '[name].js'
};

config.module = {
  loaders: [
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    },
    {
      test: /\.ts$/,
      loaders: ['ts-loader', 'angular2-template-loader']
    },
    {
      test: /\.css$/,
      loader: 'to-string!css'
    },
    {
      test: /\.html$/,
      loader: 'raw'
    }
  ]
};

config.ts = {
  compilerOptions: {
    declaration: false
  }
};

config.plugins = [
  new HtmlWebpackPlugin({
    title: 'ng2-tree',
    template: 'demo/index.ejs',
    inject: false,
    hash: true
  }),
  new CleanWebpackPlugin(['build'], {
    root: __dirname,
    verbose: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common'
  })
];

config.devServer = {
  host: 'localhost',
  port: 8080
};

module.exports = config;
