module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "globals": {
    "window": true,
    "fetch": true,
    "document": true,
    "$": true,
    "console": true
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "class-methods-use-this": 0,
    "linebreak-style": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-unused-expressions": 0,
    "react/jsx-boolean-value": 0,
    "jsx-a11y/anchor-is-valid": 0
  }
};
