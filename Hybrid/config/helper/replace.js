module.exports = function({ types: t }) {
    return {
        visitor: {
            JSX: {
                enter(path) {
                    return t.CallExpression(
                        t.MemberExpression(
                            t.identifier('wx'),
                            t.identifier('showToast')
                        ),
                        path.node.arguments
                    );
                }
            }
        }
    };
};
