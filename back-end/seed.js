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
      user1: new mongoose.Types.ObjectId('67562633c427bd4c59e5aa45'),
      user2: new mongoose.Types.ObjectId('67562685c427bd4c59e5aa48'),
    });
    console.log('Friendship seeded:', friendship);

    // ADD SEED INCOMING/OUTGOING REQUEST
    const incomingRequest = await FriendRequest.create({
      from: new mongoose.Types.ObjectId('6756269bc427bd4c59e5aa4b'),
      to: new mongoose.Types.ObjectId('67562633c427bd4c59e5aa45'),
    });

    const outgoingRequest = await FriendRequest.create({
      from: new mongoose.Types.ObjectId('67562633c427bd4c59e5aa45'),
      to: new mongoose.Types.ObjectId('675626f7c427bd4c59e5aa4e'),
    });

    console.log('Incoming friend request seeded:', incomingRequest);
    console.log('Outgoing friend request seeded:', outgoingRequest);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();
