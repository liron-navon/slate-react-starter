/* eslint-disable no-undef */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const alias = {
    jQuery: path.resolve('./node_modules/jquery'),
    $: path.resolve('./node_modules/jquery'),
};

const part = {
    resolve: {
        alias,
        extensions: ['.js', '.css', '.json']
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};

const styleLoader = {
    loader: 'style-loader',
    options: {
        hmr: isDevelopment
    }
};

const cssLoader = {
    loader: 'css-loader',
    // Enabling sourcemaps in styles when using HMR causes style-loader to inject
    // styles using a <link> tag instead of <style> tag. This causes
    // a FOUC content, which can cause issues with JS that is reading
    // the DOM for styles (width, height, visibility) on page load.
    options: {sourceMap: !isDevelopment}
};

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        sourceMap: !isDevelopment
    }
};

module.exports = {
    'webpack.extend': config => {
        const postCssRule = {
            test: /\.pcss$/,
            exclude: config.get('webpack.commonExcludes')
        };

        postCssRule.use = [
            ...(isDevelopment ? [styleLoader] : [MiniCssExtractPlugin.loader]),
            cssLoader,
            postcssLoader
        ];
        part.module.rules.push(postCssRule);

        return part
    }
};
