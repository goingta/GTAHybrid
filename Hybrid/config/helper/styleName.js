const fileExclude = /node_modules/;

module.exports = function({ types: t }) {
    return {
        visitor: {
            JSXElement: {
                enter(path, state) {
                    if (state.file.opts.filename.match(fileExclude)) {
                        return;
                    }
                    let hasClassName = false,
                        css = null;
                    path.node.openingElement.attributes.forEach(element => {
                        if (element.name && element.name.name === 'className') {
                            hasClassName = true;
                            css = element;
                        }
                    });

                    if (hasClassName) {
                        css.name.name = 'styleName';
                    }
                }
            }
        }
    };
};
