module.exports = {
  presets: [
    "@babel/preset-env", // For ES6+ transformation
    "@babel/preset-react", // For JSX transformation
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Optional but can help with async/await syntax
    '@babel/plugin-proposal-class-properties',
  ],
};
