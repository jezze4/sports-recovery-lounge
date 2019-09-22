import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const srl_db = firebaseApp.firestore();

export {srl_db, auth, providers};
