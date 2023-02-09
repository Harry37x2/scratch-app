import firebase from  'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { Firestore, getFirestore } from "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENTER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
});

export const auth = app.auth()
export const db = getFirestore(app)
// const firestore = app.firestore()
// export const db = {
//     userScratches: firestore.collection('userScratches'),
//     userBoard: firestore.collection('userBoard'),
//     getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
// }
export default app