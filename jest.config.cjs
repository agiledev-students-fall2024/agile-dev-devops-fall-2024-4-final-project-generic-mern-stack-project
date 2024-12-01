module.exports = {
  testEnvironment: "jsdom", 
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  },
  roots: ["<rootDir>/test"],  
  transformIgnorePatterns: [
    "/node_modules/(?!some-es6-module).+\\.js$" 
  ],
};
