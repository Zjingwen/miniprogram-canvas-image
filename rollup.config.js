import { uglify } from "rollup-plugin-uglify";
const env = process.env.NODE_ENV;

export default {
  input: 'src/index.js',
  output: {
    file: env === 'development' ?
      'miniprogram/lib/index.js':
      'miniprogram_dist/index.min.js',
    format: 'cjs'
  },
  plugins: [
    env === 'production' && uglify()
  ]
}
