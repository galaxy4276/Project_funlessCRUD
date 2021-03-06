import path from 'path';
import extractCSS from 'mini-css-extract-plugin';


const MODE = 'development';
const ENTRY_FILE = path.resolve(__dirname, "src", "assets", "js", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "src", "public");


const webpacking = {
  entry: ENTRY_FILE,
  mode: MODE,
  devtool: 'inline-source-map',
  output: {
    filename: "[name].js",
    path: OUTPUT_DIR,
    publicPath: OUTPUT_DIR,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: extractCSS.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ]
  },
  plugins: [
    new extractCSS({ filename: "styles.css" })
  ],
};

export default webpacking;