module.exports = function(api) {
    api.cache(true);
    const presets = [
        ["@babel/preset-env", {
            useBuiltIns: "usage",
            corejs: 3,
        }],
        "@babel/typescript",
    ];
    const plugins = [
        "@babel/plugin-proposal-class-properties",
        [
            "babel-plugin-transform-builtin-extend", {
                globals: ["Error", "Array"],
            },
        ],
    ];
    return {
        presets,
        plugins,
    };
};
