const { GenerateSW } = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor'
      }),
      new GenerateSW({
        runtimeCaching: [{
          urlPattern: new RegExp("(.+)\.(png|svg|jpg|jpeg|gif)$"),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 5
            }
          }
        }]
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        description: 'Take Javascript notes in a browser with syntax highlighting!',
        short_name: 'J.A.T.E.',
        theme_color: '#225ca3',
        background_color: '#225ca3',
        orientation: 'portrait',
        display: 'standalone',
        publicPath: './',
        fingerprints: false,
        icons: [{
          src: path.resolve('./src/images/logo.png'),
          sizes: [96, 128, 192, 256, 512]
        }]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    }
  };
};
