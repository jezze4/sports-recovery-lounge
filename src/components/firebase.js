import firebase from 'firebase';
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBpV_42KTSn5HyneR1Gt_FMdIBzSiqHbts",
    authDomain: "sports-recovery-lounge.firebaseapp.com",
    databaseURL: "https://sports-recovery-lounge.firebaseio.com",
    projectId: "sports-recovery-lounge",
    storageBucket: "sports-recovery-lounge.appspot.com",
    messagingSenderId: "882802882259",
    appId: "1:882802882259:web:6f107713219fb17e"
  };
  // Initialize Firebase
  const fbApp = firebase.initializeApp(firebaseConfig);

  const srl_db = fbApp.firestore();

  export {srl_db};
