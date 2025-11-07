import terser from "@rollup/plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import { readFileSync } from 'fs';

const plugin = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));

let input = "src/index.js";
let output = {
  file: "dist/" + plugin.name + "-src.js",
  format: "umd",
  sourcemap: true,
  name: "LeafletRotate",
  exports: "named",
};

let plugins = [
  resolve(),
  commonJS({
    include: '../node_modules/**'
  })
];

export default [{
  input: input,
  output: output,
  plugins: plugins,
},
{
  input: input,
  output: Object.assign({}, output, {
    file: "dist/" + plugin.name + ".js"
  }),
  plugins: plugins.concat(terser()),
}
];
