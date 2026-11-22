module.exports = function(api) {
    api.cache(true);
    const presets = [
        ["@babel/preset-env", { useBuiltIns: "entry", corejs: 3 }],
        "@babel/typescript",
        "@babel/react",
    ];
    const plugins = [
        ["import", { customName: (name) => `antd/es/${name}`, libraryName: "antd" }],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
    ];
    return { sourceType: 'unambiguous', presets, plugins };
};