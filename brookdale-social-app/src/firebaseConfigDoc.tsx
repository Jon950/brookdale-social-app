
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";


const firebaseApp = initializeApp( {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
});


// Initialize Firebase
var db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
         // in one tab at a time.
         // ...
    } else if (err.code === 'unimplemented') {
         // The current browser does not support all of the
         // features required to enable persistence
        // ...
    }
});

const signOutUser = () => {
  signOut(auth).then(() => {
     // Sign-out successful.
     window.location.reload();
  }).catch((error) => {
     // An error happened.
  });
}

export {db, analytics, auth, provider, signOutUser};