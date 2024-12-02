#!/usr/bin/env node

import app from './app.js';

// const port = 3001;

// const port = process.env.PORT || 3001;

// const listener = app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });


const PORT = process.env.PORT || 0; // 0 lets the OS assign a free port
const listener = app.listen(PORT, () => {
  console.log(`Server is running on port ${listener.address().port}`);
});


// Function to stop the server
const close = () => {
  listener.close();
};

// Export close function and listener

export { close, listener };

