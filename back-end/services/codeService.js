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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const codeService = {
    // Send code updates to Firebase
    async sendCodeUpdate(meetingId, code, language, timestamp) {
        try {
            const codeRef = collection(db, 'meetings', meetingId, 'messages');
            await addDoc(codeRef, {
                service: 'code',
                data: {
                    code,
                    language,
                    timestamp
                }
            });
            return true;
        } catch (error) {
            console.error('Error sending code update:', error);
            return false;
        }
    },

    // Get all code updates for a meeting
    async getCodeHistory(meetingId) {
        try {
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