const path = require("path");

exports.default = [
  "react-css-modules",
  {
    generateScopedName: "[folder]_[local]",
    handleMissingStyleName: "ignore",
    attributeNames: {
      styleName: "className",
      className: "className"
    },
    filetypes: {
      ".styl": {
        syntax: path.resolve(__dirname, "../../helper/stylus.js")
      }
    }
  }
];
