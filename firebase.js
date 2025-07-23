
Use npm

Use a <script> tag
If you're already using npm and a module bundler such as webpack or Rollup, you can run the following command to install the latest SDK (Learn more):

npm install firebase
Then, initialize Firebase and begin using the SDKs for the products you'd like to use.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvdq_VgSMhlniodhWoLhMWbOB5MJRTjeY",
  authDomain: "monarch-routes-app.firebaseapp.com",
  projectId: "monarch-routes-app",
  storageBucket: "monarch-routes-app.firebasestorage.app",
  messagingSenderId: "1019157065021",
  appId: "1:1019157065021:web:21e949a21ef828e3ee6954"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);