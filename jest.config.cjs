module.exports = {
  testEnvironment: "jsdom", 
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  },
  roots: ["<rootDir>/test"],  // Make sure this is pointing to your test folder
  transformIgnorePatterns: [
    "/node_modules/(?!some-es6-module).+\\.js$" // Optionally, if there are any node_modules that need transforming
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!quill)/", // If you have third-party dependencies like quill that you want Jest to transform
  ],

};
