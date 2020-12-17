import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


var firebaseConfig = {
    apiKey: "AIzaSyA1-nLFHmNaYbzJXBO_gl636a-iCbZsIEY",
    authDomain: "neighborhood-auth.firebaseapp.com",
    projectId: "neighborhood-auth",
    storageBucket: "neighborhood-auth.appspot.com",
    messagingSenderId: "1082706672806",
    appId: "1:1082706672806:web:8b511d80cd1a38ddb78867",
    measurementId: "G-M0ZPJSD1GP"
};




firebase.initializeApp(firebaseConfig);

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };



export const auth = firebase.auth();
export const firestore = firebase.firestore();

