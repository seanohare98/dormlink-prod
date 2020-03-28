const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SOURCE_PATH = path.join(__dirname, 'src/client');
const DIST_PATH = path.join(__dirname, 'dist');

module.exports = env => {
  const { environment } = env;

  return {
    mode: environment,
    // devtool: 'source-map',
    entry: path.join(SOURCE_PATH, '/index.js'),
    output: {
      path: DIST_PATH,
      filename: 'js/[name].[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // these options replace babel.config.js
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: true,
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: '> 0.5%, not dead, last 2 versions'
                  }
                ],
                '@babel/preset-react'
              ]
            }
          }
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        },
        {
          test: /\.svg$/,
          loader: '@svgr/webpack',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      ]
    },
    devServer: {
      contentBase: DIST_PATH,
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
      open: true,
      proxy: {
        '*': 'http://[::1]:8080',
        secure: false,
        changeOrigin: true
      },
      overlay: {
        errors: true,
        warnings: true
      }
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '/public/index.html'),
        favicon: path.join(__dirname, '/public/favicon.ico')
      }),
      new CleanWebpackPlugin()
    ]
  };
};
