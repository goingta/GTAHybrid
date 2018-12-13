const path = require('path');
const reactModule = require('./config/webpack/config/react-module').default;
const componentsPath = '@doctorwork/components-rn';

module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        path.resolve('./config/helper/styleName.js'),
        [
            'react-native-stylename-to-style',
            {
                extensions: ['styl']
            }
        ],
        [
            '@babel/plugin-transform-runtime',
            {
                helpers: true,
                regenerator: false
            }
        ],
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@tarojs/components': 'react-native',
                    '@doctorwork/components': '@doctorwork/components-rn',
                    underscore: 'lodash',
                    '@tarojs/redux': 'react-redux',
                    '@tarojs/taro': 'react'
                }
            }
        ],
        [
            './rn/plugins/transform.js',
            {
                include: ['src']
            }
        ],
        [
            'transform-define',
            {
                'process.env.TARO_ENV': 'rn'
            }
        ],
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        './rn/plugins/import'
    ]
};
