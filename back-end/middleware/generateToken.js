// strictly for sprint 2, maybe deleted for sprint 3
// for generating fake token to verify in the verifyToken function can run throughout the app

const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 'user123' }, 'test_jwt_secret');
console.log(token); 