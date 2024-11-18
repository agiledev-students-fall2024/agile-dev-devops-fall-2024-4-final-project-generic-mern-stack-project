import globals from "globals";
import plugin_js from "@eslint/js";
import snakecasejs from "eslint-plugin-snakecasejs";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: {
      snakecasejs
    },
    rules: {
      "prefer-const": "warn",
      "no-constant-binary-expression": "error",
      "require-await": "error",
      "snakecasejs/snakecasejs": "error"
    }
  },
  plugin_js.configs.recommended,
];
