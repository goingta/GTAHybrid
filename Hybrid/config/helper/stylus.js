const Input = require("postcss/lib/input");
const Parser = require("postcss/lib/parser");
const stylus = require("stylus");

const stylusSupremacy = require("stylus-supremacy");

module.exports = {
  parse(source, opts) {
    console.log("opts.from", opts.from);
    let css = stylus.render(stylusSupremacy.format(source), {
      filename: opts.from
    });
    let input = new Input(css, { from: opts.from });
    let parser = new Parser(input);
    parser.parse();
    return parser.root;
  }
};
