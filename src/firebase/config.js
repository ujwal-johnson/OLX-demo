import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDmmYOGOseUD8JBrul3Je9RIgKuQzVw7C8",
    authDomain: "olx-ba5a2.firebaseapp.com",
    projectId: "olx-ba5a2",
    storageBucket: "olx-ba5a2.appspot.com",
    messagingSenderId: "418974950381",
    appId: "1:418974950381:web:8376ff6d5a022fc6877de4",
    measurementId: "G-LHJYPQRETW"
  };

export default firebase.initializeApp(firebaseConfig)
