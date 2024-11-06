import globals from "globals";
import pluginJs from "@eslint/js";
import snakecasejs from "eslint-plugin-snakecasejs";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
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
  pluginJs.configs.recommended,
];
