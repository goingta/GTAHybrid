let ourPath;
let hasJSX;
let count;

module.exports = function({ types: t }) {
    return {
        visitor: {
            Program: {
                enter(path, { file }) {
                    if (file.opts.filename.indexOf('react-native') !== -1) {
                        return;
                    }
                    count = 0;
                    hasJSX = false;
                    const ourNode = t.importDeclaration(
                        [t.importDefaultSpecifier(t.identifier('React'))],
                        t.stringLiteral('react')
                    );

                    // Add an import early, so that other plugins get to see it
                    ourPath = path.unshiftContainer('body', ourNode)[0];
                },

                exit(_, { file }) {
                    // If our import is still intact and we haven't encountered any JSX in
                    // the program, then we just remove it. There's an edge case, where
                    // some other plugin could add JSX in its `Program.exit`, so our
                    // `JSXOpeningElement` will trigger only after this method, but it's
                    // likely that said plugin will also add a React import too.
                    if (!hasJSX) {
                        if (ourPath && !ourPath.removed) ourPath.remove();
                    }
                }
            },

            ImportDeclaration(path, { file }) {
                // Return early if this has nothing to do with React
                if (path.node.specifiers.every(x => x.local.name !== 'React'))
                    return;

                // If our import is still intact and we encounter some other import
                // which also imports `React`, then we remove ours.
                if (ourPath && path !== ourPath) {
                    if (!ourPath.removed) ourPath.remove();
                }
            },

            // VariableDeclaration(path) {
            //     if (
            //         path.node.declarations &&
            //         path.node.declarations[0].id.name === 'React'
            //     ) {
            //         if (ourPath && path !== ourPath) {
            //             if (!ourPath.removed) ourPath.remove();
            //         }
            //     }
            // },

            JSXOpeningElement(_, { file }) {
                hasJSX = true;
            }
        }
    };
};
