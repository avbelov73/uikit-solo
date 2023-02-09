import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };
import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true
            },
            {
                file: "dist/index.min.js",
                format: "iife",
                name: "version",
                plugins: [terser()]
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" })
        ]
    },
    {
        input: "dist/cjs/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "cjs" }],
        plugins: [dts()]
    }
]