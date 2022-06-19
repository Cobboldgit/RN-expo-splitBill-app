import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAHiT4gshrdithVW5dr8pL2GP5EnXTi9cw",
  authDomain: "expo-split-bill-app.firebaseapp.com",
  projectId: "expo-split-bill-app",
  storageBucket: "expo-split-bill-app.appspot.com",
  messagingSenderId: "247479971482",
  appId: "1:247479971482:web:c33c89cebd723144303923",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ merge: true });
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
