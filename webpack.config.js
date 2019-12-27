const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'none',
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        // use: [
        //   { loader: 'style-loader' },
        //   { loader: 'css-loader' },
        //   { loader: 'less-loader' },
        // ]
        loader: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [
              ['import', {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css'
              }]
            ]
          }
        },
        exclude: path.resolve(__dirname, "node_modules"),
        // use: [
        //   { loader: 'script-loader' },
        //   {
        //     loader: 'ts-loader',
        //   },
        // ]
      },
      // {
      //   test: /\.html$/,
      //   use: {
      //     loader: 'html-loader'
      //   }
      // }
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          // {
          //   loader: 'url-loader',
          //   options: {
          //     limit: 8192
          //   }
          // },
          {
            loader: 'file-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
}
