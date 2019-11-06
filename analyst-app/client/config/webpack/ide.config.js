// fake webpack config used only to help make IDE resolve .less imported files
// Don't use it for build!
// Add this in Languages & Frameworks -> Javascript -> Webpack (for webstorm IDE)
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: process.cwd(),

    // Directory resolution fix
    resolve: {
        alias: {
            'root': path.resolve(__dirname, './src'),
        }
    }
};
