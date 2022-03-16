import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIakMkDRe8LidqM1uQ_xCVNcQdeC9lHZU",
    authDomain: "react-app-cursos-aa652.firebaseapp.com",
    projectId: "react-app-cursos-aa652",
    storageBucket: "react-app-cursos-aa652.appspot.com",
    messagingSenderId: "642050470247",
    appId: "1:642050470247:web:1ff1b93ba9ae968e843fc2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();  // inicializa firestore (la base de datos)
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();  // inicializa google auth provider (para el login con google)

export {
    db,
    googleAuthProvider,
    firebase
}