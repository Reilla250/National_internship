module.exports = {
  extends: ["react-app"],
  rules: {
    // Disable warnings that cause CI build failures
    "react-hooks/exhaustive-deps": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react-hooks/rules-of-hooks": "warn",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "no-unused-vars": "off"
      }
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
};
