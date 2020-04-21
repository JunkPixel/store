import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDqMTTvnx7SW7HLCCnzrKvg4rlQRQTCNNE",
    authDomain: "crwn-db-dd6af.firebaseapp.com",
    databaseURL: "https://crwn-db-dd6af.firebaseio.com",
    projectId: "crwn-db-dd6af",
    storageBucket: "crwn-db-dd6af.appspot.com",
    messagingSenderId: "778370672890",
    appId: "1:778370672890:web:41a1ef9287c2895faa0143",
    measurementId: "G-C6VLP5PQK1"
  }

  firebase.initializeApp(config)

  export const createUserProfileDocument = async (userAuth, additionalData) => {

    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        
        await userAuth.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user' , error.message)
      }
    }

  }


  
  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase;

      
