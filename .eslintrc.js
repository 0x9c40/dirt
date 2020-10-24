module.exports = {
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 9,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:node/recommended",
    "prettier",
  ],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    "node/no-unpublished-require": 0,
    "node/no-unsupported-features/es-syntax": 0,
  },
};
