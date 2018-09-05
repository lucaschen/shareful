module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: "> 0.25%, not dead"
      }
    ],
    "@babel/preset-react",
    "@babel/preset-flow"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-json-strings"
  ],
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            targets: "> 0.25%, not dead"
          }
        ],
        "@babel/preset-react",
        "@babel/preset-flow"
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings"
      ]
    }
  }
};
