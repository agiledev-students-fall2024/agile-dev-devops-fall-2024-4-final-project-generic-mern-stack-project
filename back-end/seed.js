const mongoose = require('mongoose');
const Friendship = require('./models/Friendship');
const FriendRequest = require('./models/FriendRequest');
const Blocked = require('./models/Blocked');

mongoose.connect('mongodb+srv://zw2669:cQCTEY0g5pgfBNUv@network-cluster.n1bux.mongodb.net/?retryWrites=true&w=majority&appName=network-cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // RESET COLLECTIONS
    await FriendRequest.deleteMany();
    await Friendship.deleteMany();
    await Blocked.deleteMany();

    console.log('Collections reset.');

    // ADD SEED FRIENDSHIP
    const friendship = await Friendship.create({
      user1: new mongoose.Types.ObjectId('673f858d5fc4b9efe8ac6266'),
      user2: new mongoose.Types.ObjectId('6744f22a2a7a95bad561ca4f'),
    });

    console.log('Friendship seeded:', friendship);

    // ADD SEED REQUEST
    const friendRequest = await FriendRequest.create({
      from: new mongoose.Types.ObjectId('6744f23aa08fb8eb505b5a3b'),
      to: new mongoose.Types.ObjectId('673f858d5fc4b9efe8ac6266'),
    });

    console.log('Friend request seeded:', friendRequest);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();
