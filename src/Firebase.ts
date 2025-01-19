// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4ZBSDp-7RJ4OKWNuHh7u1iRZmeT0ALVs",
  authDomain: "nwhacks-c583c.firebaseapp.com",
  projectId: "nwhacks-c583c",
  storageBucket: "nwhacks-c583c.firebasestorage.app",
  messagingSenderId: "827959298749",
  appId: "1:827959298749:web:49a201a4151b503e4085d4",
  measurementId: "G-YC72JQQQJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
