const Input = require('postcss/lib/input');
const Parser = require('postcss/lib/parser');
const stylus = require('stylus');
let Stringifier = require('postcss/lib/stringifier');

const stylusSupremacy = require('stylus-supremacy');

module.exports = {
    parse(source, opts) {
        let css = stylus.render(stylusSupremacy.format(source), {
            filename: opts.from
        });
        let input = new Input(css, { from: opts.from });
        let parser = new Parser(input);
        parser.parse();
        return parser.root;
    },
    stringify(node, builder) {
        let str = new Stringifier(builder);
        str.stringify(node);
    }
};
