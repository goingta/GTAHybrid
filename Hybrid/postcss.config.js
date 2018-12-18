module.exports = {
  // parser: require('./config/helper/stylus'),
  syntax: require("./config/helper/stylus"),
  plugins: [
    require("postcss-import")({
      path: ["."]
    }),
    require("postcss-pxtransform")({
      platform: "rn",
      designWidth: 750,
      deviceRatio: {
        "640": 1.17,
        "750": 1,
        "828": 0.905
      }
    }),
    require("./rn/plugins/postcss")({
      paths: ["./src/asset/style/index.styl"]
    })
  ]
};
