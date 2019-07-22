const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const webpack = require('webpack');
const fs = require('fs');
const name = pkg.name;
let plugins = [];

module.exports = (env = {}) => {
  if (env.production) {
    plugins = [
      new webpack.BannerPlugin(`${name} - ${pkg.version}`),
    ]
  } else {
    const index = 'index.html';
    const indexDev = '_' + index;
    plugins.push(new HtmlWebpackPlugin({
      template: fs.existsSync(indexDev) ? indexDev : index
    }));
  }

  return {
    mode: (env.production?'production':'development'),
    entry: './src',
    output: {
        filename: `./dist/${name}.min.js`,
        library: name,
        libraryTarget: 'umd',
    },
    module: {
      rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          include: /src/,
      }],
    },
    externals: { 'grapesjs': 'grapesjs' },
    plugins: plugins,
  };
}
