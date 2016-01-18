var webpack      = require('webpack');
var path         = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var hotMiddlewareScript = 'webpack-hot-middleware/client';
var config = {
  entry: {
    // Add the client which connects to our middleware
    app: [hotMiddlewareScript, './front-end/src/js/app/app.js'],
    admin: [hotMiddlewareScript, './front-end/src/js/admin/admin.js']
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: '[name].js',
    publicPath: '/static/js/'
  },
  module: {
    noParse: [],
    loaders: [
        {
          test: /\.jsx?$/,
          exclude: [node_modules],
          loaders: ['babel-loader', 'eslint-loader']   // ES6 and jsx compiling
        }
      ]
  },
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),

    // Following 3 are for hot reloading
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

// Dev only
// config.plugins.concat(
// );

// Production optimizations
 // plugins = plugins.concat(
 //     new webpack.DefinePlugin({
 //         'process.env': {
 //             // This has effect on the react lib size
 //             'NODE_ENV': JSON.stringify('production')
 //         }
 //     }),
 //     new webpack.optimize.DedupePlugin(),
 //     new webpack.optimize.OccurenceOrderPlugin(true),
 //     new webpack.optimize.UglifyJsPlugin(),
 //     new SaveAssetsJson({
 //         path: path.resolve('../static/')
 //     })
 // );

// The minified files to use for development so webpack does not need to go in
// and recompile these every time. This should not be in our prod configuration...
// var deps = [
//   'react/dist/react-with-addons.min.js'
// ];

// Run through deps and extract the first part of the path,
// as that is what you use to require the actual node modules
// in your code. Then use the complete path to point to the correct
// file and make sure webpack does not try to parse it
// deps.forEach(function (dep) {
//     var depPath = path.resolve(node_modules, dep);
//     config.resolve.alias[dep.split(path.sep)[0]] = depPath;
//     config.module.noParse.push(depPath);
// });

module.exports = config;
