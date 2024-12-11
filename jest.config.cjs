module.exports = {
  testEnvironment: "jsdom", 
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  },
  roots: ["test"],  
  transformIgnorePatterns: [
    "/node_modules/(?!some-es6-module).+\\.js$",
    '/node_modules/(?!quill)'
  ],
  testMatch: [
    "**/test/**/*.(test|spec).js"
  ]
};
