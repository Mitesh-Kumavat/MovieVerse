import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { collection } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB4Kti29UAhMzTPwyp_thFkmDgaKdLIIkw",
    authDomain: "movieverse-360ad.firebaseapp.com",
    projectId: "movieverse-360ad",
    storageBucket: "movieverse-360ad.appspot.com",
    messagingSenderId: "510157505254",
    appId: "1:510157505254:web:1b0dbfff6fa0011e5ef127",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // here by doing this we access our database (MovieVerse)
export const moviesRef = collection(db, "movies"); // we get the table movies by doing this
export default app;