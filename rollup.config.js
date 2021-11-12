import { uglify } from "rollup-plugin-uglify";
import typescript from "rollup-plugin-typescript";
const env = process.env.NODE_ENV;

export default {
  input: 'src/index.ts',
  output: {
    file: env === 'development' ?
      'miniprogram/lib/index.js' :
      'miniprogram_dist/index.min.js',
    format: 'cjs'
  },
  plugins: [
    env === 'production' && uglify(),
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    }),
  ]
}
