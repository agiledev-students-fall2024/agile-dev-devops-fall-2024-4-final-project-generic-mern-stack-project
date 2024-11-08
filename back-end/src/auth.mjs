import bcrypt from 'bcryptjs';

export let users = [];

export const clearUsers = () => {
  users = [];
};

// const startAuthenticatedSession = (req, user) => {
//   return new Promise((fulfill, reject) => {
//     req.session.regenerate((err) => {
//       if (!err) {
//         req.session.user = user; 
//         fulfill(user);
//       } else {
//         reject(err);
//       }
//     });
//   });
// };

// const endAuthenticatedSession = req => {
//   return new Promise((fulfill, reject) => {
//     req.session.destroy(err => err ? reject(err) : fulfill(null));
//   });
// };

const register = async (username, email, password) => {
  if (username.length < 8 || password.length < 8) {
    throw { message: 'USERNAME/PASSWORD TOO SHORT' };
  }
  
  const existing = users.find(user => user.username === username);
  if (existing) {
    throw { message: 'USERNAME ALREADY EXISTS' };
  }
  
  const hash = bcrypt.hashSync(password, 10);
  
  const newUser = {
    username,
    email,
    password: hash,
  };

  users.push(newUser);

  return newUser;
};

const login = async (username, password) => {
  const user = users.find(user => user.username === username);
  if (!user) {
    throw { message: "USER NOT FOUND" };
  }

  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    throw { message: "PASSWORDS DO NOT MATCH" };
  }

  return user;
};

export {
  // startAuthenticatedSession,
  // endAuthenticatedSession,
  register,
  login
};
