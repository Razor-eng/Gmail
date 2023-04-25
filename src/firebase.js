import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD3uadDMf_o0wAn78ssUR3XUxtDWSwaPY8",
    authDomain: "fir-ae40f.firebaseapp.com",
    projectId: "fir-ae40f",
    storageBucket: "fir-ae40f.appspot.com",
    messagingSenderId: "421959876577",
    appId: "1:421959876577:web:1593ef34e17bb1f0eb5ca0"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }; 
