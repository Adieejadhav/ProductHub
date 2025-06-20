// firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAV9fMwMcnbqO08Pb1aIgAKQaiL0LIxHog",
    authDomain: "producthub-10130.firebaseapp.com",
    projectId: "producthub-10130",
    storageBucket: "producthub-10130.firebasestorage.app",
    messagingSenderId: "593285611621",
    appId: "1:593285611621:web:53646b131b1fbbb34d468c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
