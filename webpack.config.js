// recall: webpack is read by node, so we need ES5 syntax
const path = require('path');

// use babel loader to load any files ending in .tsx, except node modules
const rules = [
  {
    test: /\.tsx?/,
    exclude: /node_modules/,
    loader: 'babel-loader',
  },
];

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'), // this is where the minified file will go
    filename: 'bundle.js', // same as js file name we put in index.html
  },
  module: { rules },
  resolve: { extensions: ['.ts', '.tsx', '.js'] }, // ignore these extensions when importing
  devServer: {
    contentBase: './', // get content at this location
    port: 5000,
  }
}
