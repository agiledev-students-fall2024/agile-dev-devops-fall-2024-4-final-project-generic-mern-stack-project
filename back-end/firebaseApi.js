const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, setDoc, collection, getDocs, onSnapshot } = require('firebase/firestore');

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

const getMeeting = async (meetingId) => {
    const docRef = doc(db, 'meetings', meetingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return false;
    }
}

const createMeeting = async (meetingId, details) => {
    const docRef = doc(db, 'meetings', meetingId);
    try {
        await setDoc(docRef, details);
    } catch (error) {
        console.error('Error creating meeting:', error);
    }
}

const getAllMessages = async (meetingId) => {
    try {
        const messagesRef = collection(db, 'meetings', meetingId, 'messages');
        const messagesSnapshot = await getDocs(messagesRef);
        return messagesSnapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error('Error getting all messages:', error);
    }
}

const listenForNewMessages = async (meetingId, callback, all = false) => {
    const messagesRef = collection(db, 'meetings', meetingId, 'messages');
    const unsub = onSnapshot(messagesRef, (snapshot) => {
        if (all) {
            callback(snapshot.docs.map(doc => doc.data()));
        } else {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    callback(change.doc.data());
                }
            });
        }
    });
    return unsub;
}

module.exports = { getMeeting, getAllMessages, listenForNewMessages, createMeeting };