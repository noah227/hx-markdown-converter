const {nodeResolve} = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const typescript = require("@rollup/plugin-typescript")
const pluginJson = require("@rollup/plugin-json")
const terser = require("@rollup/plugin-terser")
const copyPlugin = require("rollup-plugin-copy")

const plugins = [
    nodeResolve(),
    // typescript(),
    commonjs(),
    pluginJson(),
    // terser(),
	copyPlugin({
		targets: [
			{src: "./node_modules/mdpdf/src/assets/**/*", dest: "./dist/assets"},
			{src: "./node_modules/mdpdf/src/layouts/**/*", dest: "./dist/layouts"}
		]
	})
]

// 打包后就可以舍弃node_modules了
module.exports = [
    { 
        input: "converter.src.js",
        output: {
			dir: "./dist",
			name: "converter.js",
            format: "cjs",
            exports: "auto",
            sourcemap: false
        },
        plugins: [
            ...plugins
        ]
    }
]
