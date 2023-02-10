import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json" assert { type: "json" };
import terser from "@rollup/plugin-terser";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
                name: packageJson.version
            },
        ],
        plugins: [
            excludeDependenciesFromBundle(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(),
        ]
    },
]