const path = require("path");

module.exports = {
  mode: "production",
  entry: "./app.js",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "final.js",
  },
  target: "node",
};
module.exports = {
  target: 'node',
  externals: {
    'mongodb-client-encryption': 'commonjs mongodb-client-encryption'
  }
};
