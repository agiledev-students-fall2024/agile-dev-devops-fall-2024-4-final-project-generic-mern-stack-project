const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt'); // For hashing passwords
const usersPath = path.join(__dirname, '../data/users.json');

// Helper function to read users from the JSON file
function readUsers() {
    if (!fs.existsSync(usersPath)) {
        fs.writeFileSync(usersPath, JSON.stringify([]));
    }
    const data = fs.readFileSync(usersPath, 'utf-8');
    return JSON.parse(data);
}

// Helper function to save users to the JSON file
function saveUsers(users) {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

exports.signup = (req, res) => {
    const { email, password } = req.body;

    // Read existing users
    const users = readUsers();

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Add new user to the list
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    // Save updated users list
    saveUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Read existing users
    const users = readUsers();

    // Find the user by email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
};
