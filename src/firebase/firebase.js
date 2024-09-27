import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: String(import.meta.env.VITE_API_KEY),
    authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET_ID),
    messagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
    appId: String(import.meta.env.VITE_APP_ID),
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const auth = getAuth(app);
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");
export default app;