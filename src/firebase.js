import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDg4luwMtsTR0EB9cBMOamiW8cMU_b8EL0",
    projectId: "brdtheo-moviz",
};
firebase.initializeApp(config);

// Get a Firestore instance
export const db = firebase.firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

// auth
export const auth = firebase.auth(); 