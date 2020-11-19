import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// init
var config = {
    apiKey: "FIREBASE_API_KEY",
    projectId: "FIREBASE_PROJECT_ID",
};
firebase.initializeApp(config);

// instance
export const db = firebase.firestore()

// auth
export const auth = firebase.auth(); 