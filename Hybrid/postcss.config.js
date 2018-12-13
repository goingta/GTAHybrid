module.exports = {
    plugins: [
        require('postcss-import')({
            path: ['.']
        }),
        require('postcss-pxtransform')({
            platform: 'rn',
            designWidth: 750
        }),
        require('./rn/plugins/postcss')({
            paths: ['./src/asset/style/index.styl']
        })
    ]
};
