module.exports = function(api) {
    api.cache(true);
    const presets = [
        ["@babel/preset-env", {
            useBuiltIns: "usage",
            corejs: 3,
        }],
        "@babel/typescript",
        "@babel/react",
    ];
    const plugins = [
        [
            "import",
            {
                "customName": (name) => {
                    return `antd/es/${name}`;
                },
                "libraryName": "antd",
            },
        ],
        "@babel/plugin-proposal-class-properties",
        [
            "babel-plugin-transform-builtin-extend", {
            globals: ["Error", "Array"],
        },
        ],
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
    ];
    return {
        presets,
        plugins,
    };
};
