import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs, onSnapshot, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const getMeeting = async (meetingId) => {
    const docRef = doc(db, 'meetings', meetingId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
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

const sendDataToMeetingRoom = async (meetingId, service, data) => {
    const messagesRef = collection(db, 'meetings', meetingId, 'messages');
    await addDoc(messagesRef, { service, data, timestamp: Date.now() });
    // await messagesRef.add({ service, data, timestamp: Date.now() });
}

export { getMeeting, getAllMessages, listenForNewMessages, sendDataToMeetingRoom };

// test
// (async () => {
//     const meetingId = 'deezzznut';
//     const meeting = await getMeeting(meetingId);
//     const messages = await getAllMessages(meetingId);
//     console.log('Meeting:', meeting);
//     console.log('Messages:', messages);
//     listenForNewMessages(meetingId, (messages) => {
//         console.log('Messages:', messages);
//     });
// })();
