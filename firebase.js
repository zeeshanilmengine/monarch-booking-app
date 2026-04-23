// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ✅ Your web app's Firebase configuration
const firebaseConfig = {
  authDomain: "monarch-routes-app.firebaseapp.com",
  projectId: "monarch-routes-app",
  storageBucket: "monarch-routes-app.appspot.com", // ✅ FIXED: should be .appspot.com
  messagingSenderId: "1019157065021",
  appId: "1:1019157065021:web:21e949a21ef828e3ee6954"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Get Firestore instance
const db = getFirestore(app);

export { db };
