// Add this at the top of each test file that needs database access
import dotenv from 'dotenv';

// Load test environment variables
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// Example connection setup (use in before() hooks):
before(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to test database');
  } catch (error) {
    console.error('Error connecting to test database:', error);
    process.exit(1);
  }
});

// Example cleanup (use in after() hooks):
after(async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('Test database cleaned and connection closed');
  } catch (error) {
    console.error('Error cleaning up test database:', error);
  }
});