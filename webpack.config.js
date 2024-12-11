module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Process both .js and .jsx files
          exclude: /node_modules/, // Don't transpile node_modules
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"] // Resolve these extensions
    }
  };
  