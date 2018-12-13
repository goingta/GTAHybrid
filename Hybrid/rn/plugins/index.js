// For React Native version 0.56 or later
var upstreamTransformer = require('metro/src/reactNativeTransformer');

// For React Native version 0.52-0.55
// var upstreamTransformer = require("metro/src/transformer");

// For React Native version 0.47-0.51
// var upstreamTransformer = require("metro-bundler/src/transformer");

// For React Native version 0.46
// var upstreamTransformer = require("metro-bundler/build/transformer");

var postcssTransformer = require('react-native-postcss-transformer');

var postCSSExtensions = ['styl']; // <-- Add other extensions if needed.

module.exports.transform = function ({ src, filename, options }) {
    if (postCSSExtensions.some(ext => filename.endsWith('.' + ext))) {
        const res = postcssTransformer.transform({ src, filename, options });
        return res;
    }
    return upstreamTransformer.transform({ src, filename, options });
};