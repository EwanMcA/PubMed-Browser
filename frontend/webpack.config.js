const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = function (webpackEnv) {
  const isEnvProduction = webpackEnv === "production";

  return {
    devtool: isEnvProduction ? "source-map" : "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [{
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-react"] }
        }
      }, {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]'
              }
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        hash: true,
        filename: "index.html",  //target html
        template: "./src/index.html" //source html
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
