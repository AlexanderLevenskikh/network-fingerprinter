const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({ grid: 'autoplace' }),
        require('postcss-flexbugs-fixes'),
    ],
};
