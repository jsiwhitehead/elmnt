module.exports = {
  mode: 'development',
  entry: './test/index.tsx',
  output: { filename: 'bundle.js' },
  devServer: { contentBase: './test' },
  devtool: 'source-map',
  resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { compilerOptions: { sourceMap: true, rootDir: '' } },
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
};
