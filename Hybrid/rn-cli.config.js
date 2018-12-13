const path = require('path');

module.exports = {
    getSourceExts() {
        return ['js', 'jsx', 'styl'];
    },
    // for newer version
    resolver: {
        sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx', 'styl', 'cjs.js'],
        blacklistRE: RegExp(path.resolve('.', 'dist'))
    },
    transformer: {
        babelTransformerPath: require.resolve('./rn/plugins')
    }
};