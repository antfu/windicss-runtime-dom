import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.js', format: 'iife' },
      {
        file: 'dist/index.min.js',
        format: 'iife',
        plugins: [
          terser({
            format: {
              comments: false,
            },
          }),
        ],
      },
    ],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      commonjs(),
      resolve(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [
      dts(),
    ],
  },
]
