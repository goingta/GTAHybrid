const template = require('@babel/template');
var $path = require('path');
const traverse = require('@babel/traverse').default;

const compile = (code, type = 'default') => {
    return template[type](code, {
        sourceType: 'module',
        plugins: [
            'classProperties',
            'jsx',
            'trailingFunctionCommas',
            'asyncFunctions',
            'exponentiationOperator',
            'asyncGenerators',
            'objectRestSpread',
            'dynamicImport'
        ]
    })();
};

var dir = process.cwd();
module.exports = function(babel) {
    var css = null;
    var style = null;
    var t = babel.types;
    var templateLiteral = null;

    function isJoinExpression(value) {
        return (
            value.expression.callee &&
            value.expression.callee.property &&
            value.expression.callee.property.name &&
            value.expression.callee.property.name.toLowerCase() === 'join' &&
            t.isArrayExpression(value.expression.callee.object)
        );
    }

    function isTemplateLiteralWithExpressions(value) {
        return (
            t.isJSXExpressionContainer(value) &&
            t.isTemplateLiteral(value.expression) &&
            value.expression.expressions.length > 0
        );
    }

    function isTemplateLiteralWithString(value) {
        return (
            t.isJSXExpressionContainer(value) &&
            t.isStringLiteral(value.expression)
        );
    }

    function isArrayWithJoin(value) {
        return t.isJSXExpressionContainer(value) && isJoinExpression(value);
    }

    function isValidState(state) {
        var isIncluded = false;
        if (!state.opts.dev) {
            // 默认 src 目录
            if (state.opts.include) {
                isIncluded = state.opts.include
                    .map(item => $path.join(dir, item))
                    .some(item => {
                        return state.file.opts.filename.match(item);
                    });
            }
        }
        return isIncluded;
    }

    // 处理 css 属性
    // 将字符串转映射到 styles 下的对象： 'title' => {styles.title}
    function processStyle(path) {
        var name = path.node.name.name;
        if (name === 'className') {
            css = path;
        } else if (name === 'style') {
            style = path;
        }

        if (css === null) {
            return;
        }

        if (style && style.node.value.expression && templateLiteral) {
            style.node.value = t.arrayExpression(
                [].concat(
                    templateLiteral.expression.expressions,
                    style.node.value.expression
                )
            );
            css.replaceWith(style);
            style.remove();
            templateLiteral = null;
            css = null;
            style = null;
        } else if (isTemplateLiteralWithExpressions(css.node.value)) {
            templateLiteral = css.node.value;
            css.node.value = t.arrayExpression(
                css.node.value.expression.expressions
            );
            css.node.name.name = 'style';
        }
    }

    // 替换指定元素的extra和item属性
    // 将字符串转换为 表达式 'Item' => {Item}
    const elmToReplace = ['ListView'];
    function processListAttribute(path) {
        if (
            !path.node.value ||
            !path.node.value.value ||
            elmToReplace.indexOf(path.parent.name.name) == -1
        ) {
            return;
        }
        // check element name
        if (path.node.name.name == 'item') {
            // path.node.value.replace(t.JSXExpressionContainer(t.JSXIdentifier(path.node.value.value)));
            path.replaceWith(
                t.JSXAttribute(
                    t.JSXIdentifier('item'),
                    t.JSXExpressionContainer(
                        t.identifier(path.node.value.value)
                    )
                )
            );
            return;
        }
        if (path.node.name.name == 'extra') {
            let node;
            const ast = template.expression.ast(path.node.value.value);
            const code = traverse(
                ast,
                {
                    enter(_path) {
                        if (!node) {
                            node = _path;
                            path.replaceWith(
                                t.JSXAttribute(
                                    t.JSXIdentifier('extra'),
                                    t.JSXExpressionContainer(node.parent)
                                )
                            );
                        }
                    }
                },
                path.scope,
                path.state
            );
        }
    }

    let hasAlert = false;
    let alertImport = compile("import { Alert } from 'react-native';");

    return {
        visitor: {
            JSXOpeningElement: {
                exit(path, state) {
                    var isIncluded = false;
                    if (!state.opts.dev) {
                        // 默认 src 目录
                        if (state.opts.include) {
                            isIncluded = state.opts.include
                                .map(item => $path.join(dir, item))
                                .some(item => {
                                    return state.file.opts.filename.match(item);
                                });

                            if (!isIncluded) return;
                        }
                    }

                    var isSameElement =
                        css &&
                        style &&
                        css.parentPath.node !== style.parentPath.node;
                    // 添加 style 元素
                    if (css && t.isStringLiteral(css.node.value)) {
                        let value = css.node.value.value;
                        if (!value) {
                            return;
                        }

                        let clsList = value.split(' ');
                        let path = t.JSXAttribute(
                            t.JSXIdentifier('style'),
                            t.JSXExpressionContainer(
                                t.ArrayExpression(
                                    clsList.map(cls => {
                                        return t.memberExpression(
                                            t.identifier('styles'),
                                            t.stringLiteral(cls),
                                            true
                                            // `computed` is optional
                                        );
                                    })
                                )
                            )
                        );
                        css.insertAfter(path);
                    }

                    css = null;
                    style = null;
                }
            },
            JSXAttribute: function JSXAttribute(path, state) {
                // style is now processed with babel-plugin-css-modules
                // processStyle(path, state);
                processListAttribute(path, state);
            },
            CallExpression(path) {
                // rewrite alert to Alert.Alert
                if (path.node.callee.name == 'alert') {
                    hasAlert = true;
                    path.node.callee = t.memberExpression(
                        t.identifier('Alert'),
                        t.identifier('alert')
                    );
                }
            },
            Program: {
                exit(path) {
                    if (!hasAlert) {
                        return;
                    }
                    hasAlert = false;

                    const lastImport = path
                        .get('body')
                        .filter(p => p.isImportDeclaration())
                        .pop();

                    if (lastImport) {
                        lastImport.insertAfter(alertImport);
                    } else {
                        path.get('body').unshiftContainer('body', alertImport);
                    }
                }
            }
        }
    };
};
