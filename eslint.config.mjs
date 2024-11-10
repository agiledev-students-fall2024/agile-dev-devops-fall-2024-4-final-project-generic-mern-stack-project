import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["back-end/**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    languageOptions: { globals: globals.browser },
  },
];
