#!/usr/bin/env node

import app from './app.js';

// const port = 3001;

const port = process.env.PORT || 3001;

const listener = app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
// if (process.env.NODE_ENV !== 'test') {
//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
// }

// Function to stop the server
const close = () => {
  listener.close();
};

// Export close function and listener
export { close, listener };
