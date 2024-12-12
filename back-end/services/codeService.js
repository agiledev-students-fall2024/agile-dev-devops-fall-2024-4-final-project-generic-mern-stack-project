// services/codeService.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, query, orderBy } = require('firebase/firestore');
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const codeService = {
    db,  // Export the Firestore instance

    async getCodeHistory(meetingId) {
        try {
            const messagesRef = collection(db, 'meetings', meetingId, 'messages');
            const q = query(messagesRef, orderBy('timestamp'));
            const snapshot = await getDocs(q);
            
            return snapshot.docs
                .filter(doc => doc.data().service === 'code')
                .map(doc => doc.data());
        } catch (error) {
            console.error('Error getting code history:', error);
            throw error;
        }
    },

    async sendCodeUpdate(meetingId, code, language, timestamp) {
        try {
            const messagesRef = collection(db, 'meetings', meetingId, 'messages');
            await addDoc(messagesRef, {
                service: 'code',
                data: {
                    code,
                    language
                },
                timestamp
            });
            return true;
        } catch (error) {
            console.error('Error sending code update:', error);
            return false;
        }
    }
};

module.exports = codeService;