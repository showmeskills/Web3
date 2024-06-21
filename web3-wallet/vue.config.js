const { defineConfig } = require('@vue/cli-service');
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins :[
      new NodePolyfillWebpackPlugin(),
      ComponentsPlugin({resolvers: [VantResolver()]}),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ]
  }
})
