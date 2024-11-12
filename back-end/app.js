// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const User = require('./models/User');
const BudgetGoal = require('./models/BudgetGoal');

// we will put some server logic here later...

// export the express app we created to make it available to other modules
module.exports = app

app.get("/", (req, res) => {
    res.send("Hello!")
})

//endpoints

//inviting collaborator 
app.post('/goals/:goalId/invite', async (req, res) => {
    try {
        const { goalId } = req.params;
        const { collaboratorEmail } = req.body;

        const goal = await BudgetGoal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        const collaborator = await User.findOne({ email: collaboratorEmail });
        if (!collaborator) {
            return res.status(404).json({ error: 'Collaborator not found' });
        }

        if (!goal.collaborators.includes(collaborator._id)) {
            goal.collaborators.push(collaborator._id);
            await goal.save();
        }

        res.status(200).json({ message: 'Collaborator added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve all goals accessible by the user
app.get('/goals/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const goals = await BudgetGoal.find({
            $or: [{ owner: userId }, { collaborators: userId }]
        });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve user account details
app.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user account details
app.post('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, password, profilePicture } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10); // Hash the new password
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



