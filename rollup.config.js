import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
		},
		{
			file: 'dist/index.esm.js',
			format: 'esm',
		},
		{
			file: 'dist/index.umd.js',
			format: 'umd',
			name: 'EhmdsOnFkuiTest',
			globals: {
				vue: 'Vue',
				'@fkui/vue': 'FkuiVue'
			}
		}
	],
	external: ['vue', '@fkui/vue'], // Don't bundle these dependencies
	plugins: [
		resolve(),
		commonjs(),
		vue({
			css: true,
			compileTemplate: true
		}),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
		}),
		postcss({
			extract: 'css/styles.css',
			minimize: true,
		}),
		terser(),
	],
};