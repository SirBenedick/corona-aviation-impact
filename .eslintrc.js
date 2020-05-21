module.exports = {
  env: {
    es6: true
  },
  extends: [
    // add more generic rulesets here, such as:
    //'eslint:recommended'
    "plugin:vue/strongly-recommended"
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "indent": ["error", 2],
    "no-multiple-empty-lines": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }]
  }
}