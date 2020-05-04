const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `sourcemap`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true
  },
  resolve: {
    alias: {
        moment$: `moment/moment.js`
    }
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};
