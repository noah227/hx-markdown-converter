const {nodeResolve} = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const typescript = require("@rollup/plugin-typescript")
const pluginJson = require("@rollup/plugin-json")
const terser = require("@rollup/plugin-terser")
const copyPlugin = require("rollup-plugin-copy")

const plugins = [
    nodeResolve({
        preferBuiltins: true
    }),
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
        input: "./src/converter.js",
        output: {
			dir: "./dist",
            format: "cjs",
            exports: "auto",
            sourcemap: false
        },
        external: ["semver", "@tootallnate/quickjs-emscripten", "marked"],
        plugins: [
            ...plugins
        ]
    }
]
