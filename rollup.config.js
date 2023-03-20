/* eslint-disable @typescript-eslint/no-var-requires */
const commonjs = require('@rollup/plugin-commonjs')
const imageResolver = require('@rollup/plugin-image')
const nodeResolve = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')
const ts = require('@rollup/plugin-typescript')
const postcss = require('rollup-plugin-postcss')
const { uglify } = require('rollup-plugin-uglify')

const { NODE_ENV } = process.env

const plugins = [
  commonjs(),
  imageResolver(),
  nodeResolve(),
  ts(),
  replace({ 'process.env.NODE_ENV': `"${NODE_ENV}"`, preventAssignment: true }),
  postcss({ extensions: ['.scss'], modules: true }),
]
if (NODE_ENV === 'production') {
  plugins.push(uglify())
}

const builds = [
  { background: 'src/background.ts' },
  { 'options/index': 'src/options/index.tsx' },
  { 'popup/index': 'src/popup/index.tsx' },
]

function buildOption(entry) {
  return {
    input: entry,
    output: {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'es',
    },
    plugins,
  }
}

module.exports = builds.map((build) => buildOption(build))
