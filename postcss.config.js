const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const lost = require('lost');
const fontMagician = require('postcss-font-magician');

module.exports = {
    plugins: [
        // Compresses the css files
        cssnano,
        // Adds autoprefixes and modern css for old browsers
        postcssPresetEnv,
        // Calculates all the grid systems with calc
        lost,
        // Adds all the fonts automatically
        fontMagician
    ]
}