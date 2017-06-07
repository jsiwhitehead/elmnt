module.exports = {
  entry: './test/index.tsx',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/test',
  },

  devServer: {
    contentBase: './test',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            sourceMap: true,
            rootDir: '',
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
};
