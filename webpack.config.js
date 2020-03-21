const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const SOURCE_PATH = path.join(__dirname, './src/client');
const DIST_PATH = path.join(__dirname, './dist');

module.exports = env => {
  const { environment } = env;

  return {
    mode: environment,
    entry: [path.join(SOURCE_PATH, './index.js')],
    output: {
      path: DIST_PATH,
      filename: 'js/[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
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
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|gif|svg)$/,
          loader: 'url-loader?limit=100000'
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
        '/api': 'http://localhost:8080'
      },
      overlay: {
        errors: true,
        warnings: true
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html'),
        favicon: path.join(__dirname, 'public/favicon.ico')
      }),
      new CleanWebpackPlugin()
    ]
  };
};
