import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";

import pkg from "./package.json";

export default {
  input: "src/shareful.js",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    },
    {
      file: "lib/shareful.umd.js",
      format: "umd",
      name: "Shareful"
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    babel({
      plugins: ["external-helpers"]
    }),
    uglify()
  ]
};
