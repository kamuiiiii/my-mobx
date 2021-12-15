const path = require('path')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  return {
    mode: argv.mode,
    entry: './src/index.ts',
    devtool: isProduction ? false : 'source-map',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        type: 'commonjs',
      },
      globalObject: 'this',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
          },
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  }
}