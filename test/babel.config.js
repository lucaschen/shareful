module.exports = {
  presets: [["@babel/preset-env", { targets: "> 0.25%, not dead" }], "@babel/preset-react", "@babel/preset-flow"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@root": "./src"
        }
      }
    ],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-json-strings"
  ]
};
