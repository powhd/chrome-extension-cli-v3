const path = require("path");
// const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    popup: "./src/popup.jsx",
    content: "./src/content/index.js",
    background: "./src/background/index.js",
  },
  // 在 output.filename 中的 [name] 指的是 entry 中的 KEY
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // loaders❌ rules✔️
  module: {
    rules: [
      // We use Babel to transpile JSX
      {
        test: /\.js[x]$/,
        include: [path.resolve(__dirname, "./src")],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        use: "file-loader?limit=100000",
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?limit=100000",
          {
            loader: "img-loader",
            options: {
              enabled: true,
              optipng: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // create CSS file with all used styles
    new MiniCssExtractPlugin(),
    // create popup.html from template and inject styles and script bundles
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["popup"],
      filename: "popup.html",
      template: "./src/template.html",
    }),
    // copy extension manifest and icons
    // https://stackoverflow.com/questions/63379652/validationerror-invalid-options-object-copy-plugin-has-been-initialized-using 需要写成 { patterns: [] }的形式。
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/manifest.json",
        },
        {
          from: "./src/images",
          to: "./images",
        },
      ],
    }),
  ],
};
