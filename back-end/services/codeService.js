// services/codeService.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, onSnapshot, query, orderBy } = require('firebase/firestore');
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

// Initialize Firebase immediately
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('Initializing Firebase with config:', {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain
});

const codeService = {
    // Make db accessible
    db,

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
    },

    async sendCodeUpdate(meetingId, code, language, timestamp) {
        try {
            console.log(`Sending code update for meeting ${meetingId}`);
            const codeRef = collection(db, 'meetings', meetingId, 'messages');
            const docRef = await addDoc(codeRef, {
                service: 'code',
                data: {
                    code,
                    language,
                    timestamp
                }
            });
            console.log('Code update sent successfully, doc ID:', docRef.id);
            return true;
        } catch (error) {
            console.error('Error sending code update:', error);
            return false;
        }
    },

    async getCodeHistory(meetingId) {
        try {
            console.log(`Getting code history for meeting ${meetingId}`);
            const codeRef = collection(db, 'meetings', meetingId, 'messages');
            const q = query(codeRef, orderBy('timestamp'));
            
            return new Promise((resolve, reject) => {
                onSnapshot(q, (snapshot) => {
                    const updates = [];
                    snapshot.forEach((doc) => {
                        if (doc.data().service === 'code') {
                            updates.push(doc.data());
                        }
                    });
                    console.log(`Retrieved ${updates.length} code updates`);
                    resolve(updates);
                }, reject);
            });
        } catch (error) {
            console.error('Error getting code history:', error);
            throw error;
        }
    }
};

module.exports = codeService;