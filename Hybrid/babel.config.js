const path = require("path");
const reactModule = require("./config/webpack/config/react-module").default;

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: false
      }
    ],
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@tarojs/components": "react-native",
          underscore: "lodash",
          "@tarojs/taro": "react"
        }
      }
    ],
    [
      "./rn/plugins/transform.js",
      {
        include: ["src"]
      }
    ],
    [
      "transform-define",
      {
        "process.env.TARO_ENV": "rn"
      }
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    "./rn/plugins/import"
  ]
};
