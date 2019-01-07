import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/index.js',
    plugins: [
        resolve(),
        babel({
          exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ],
    output: [
        {
            format: 'cjs',
            file: 'dist/image-permutation.common.js',
        }, {
            format: 'es',
            file: 'dist/image-permutation.es.js',
        }, {
            format: 'umd',
            name: 'ImagePermutation',
            file: 'dist/image-permutation.umd.js',
        }
    ]
};