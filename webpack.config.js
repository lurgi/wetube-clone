const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path"); // path를 만들어주는 함수

module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
    recorder: "./src/client/js/recorder.js",
  }, // 변경하고자 하는 파일의 경로
  watch: true,
  mode: "development",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js", //파일의 이름을 정할 수 있다.
    path: path.resolve(__dirname, "assets"),
    clean: true,
    // 저장하고자 하는 파일의 경로. 절대경로로 지정하여야 한다.
    //__dirname은 현재파일의 절대경로를 나타내는 JS에서 제공하는 것.
  },
  //rules는 각 파일을 어떤 변환을 거칠지 알려주는 것.
  module: {
    rules: [
      {
        //js파일을 babel로 변환한다.
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // loader는 적힌 반대 순서로 작동.
      },
    ],
  },
};
