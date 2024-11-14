const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
let db = getFirestore(app); // Default Firestore instance

const codeService = {
    setDb: (testDb) => {
        db = testDb; // Inject a mock Firestore instance for testing
    },

    async testConnection() {
        try {
            const testRef = collection(db, 'test_connection');
            const testDoc = await addDoc(testRef, {
                test: 'Connection test',
                timestamp: Date.now()
            });
            console.log('Test document written with ID:', testDoc.id);
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
};

module.exports = codeService;
