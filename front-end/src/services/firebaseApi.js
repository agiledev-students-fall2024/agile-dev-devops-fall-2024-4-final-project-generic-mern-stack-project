import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs, onSnapshot, addDoc, setDoc, updateDoc, query, orderBy, arrayUnion } from 'firebase/firestore';

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
    try {

        const docRef = doc(db, 'meetings', meetingId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return false;
        }
    } catch (error) {
        console.log('Firebase error while trying to get meeting: ', meetingId)
        return false
    }
}

const joinAsParticipant = async (meetingId, participant) => {
    const docRef = doc(db, 'meetings', meetingId);
    try {
        await updateDoc(docRef, {
            participants: arrayUnion(participant)
        });
        const docSnap = await getDoc(docRef);
        return docSnap.data().participants;
    } catch (error) {
        console.error('Error joining as participant:', error);
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
    const unsub = onSnapshot(query(messagesRef, orderBy('timestamp')), (snapshot) => {
        if (all) {
            callback(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        } else {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    callback({ ...change.doc.data(), id: change.doc.id });
                }
            });
        }
    });
    return unsub;
}

const sendDataToMeetingRoom = async (meetingId, service, data, username) => {
    const messagesRef = collection(db, 'meetings', meetingId, 'messages');
    const res = await addDoc(messagesRef, { username: username, service, data, timestamp: Date.now() });
}

const partialEditMessage = async (meetingId, data) => {
    const docRef = doc(db, 'meetings', meetingId);
    await docRef.update(data);
}

export { getMeeting, getAllMessages, listenForNewMessages, sendDataToMeetingRoom, partialEditMessage, joinAsParticipant };

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
