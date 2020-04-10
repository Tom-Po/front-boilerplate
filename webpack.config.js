const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const mode = process.env.NODE_ENV;
const devMode = mode !== 'production';

//--------------------------------------------
// config
const CONFIG = {};

CONFIG.output = {
  path: __dirname + '/dist/',
  publicPath: ''
};

if (devMode) {
  CONFIG.output.js = '[name].dev.js';
  CONFIG.output.css = '[name].dev.css';
} else {
  CONFIG.output.js = '[name].[hash].prod.js';
  CONFIG.output.css = '[name].[hash].prod.css';
}

//--------------------------------------------
// webpack config
module.exports = {
  mode: mode,

  entry: {
    main: './src/js/main.js'
  },

  performance: {
    hints: devMode ? false : 'warning'
  },

  resolve: {
    extensions: ['*', '.js'],
    alias: {
      assets: path.resolve(__dirname, 'src')
    },
    modules: ['node_modules']
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: CONFIG.output.css
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CleanWebpackPlugin(),
    new StylelintPlugin(),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: __dirname + '/src/views/index.html.twig'
    })
  ],

  devServer: {
    contentBase: path.resolve(__dirname),
    host: '127.0.0.1',
    port: 9004,
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true,
    stats: {
      colors: true
    }
  },

  output: {
    filename: CONFIG.output.js,
    path: CONFIG.output.path,
    publicPath: CONFIG.output.publicPath
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode
            }
          },
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          name: 'fonts/[name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader?interpolate=require'
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.html/,
        loader: 'htmlhint-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.twig$/,
        exclude: /node_modules/,
        use: ['html-loader', 'twig-html-loader']
      }
    ]
  },

  devtool: 'source-map'
};
