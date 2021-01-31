import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';
import "firebase/storage";


const env = process.env

const firebaseConfig = {
  apiKey: env["REACT_APP_FIREBASE_API_KEY"],
  authDomain: env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
  projectId: env["REACT_APP_FIREBASE_PROJECT_ID"],
  storageBucket: env["REACT_APP_FIREBASE_PROJECT_ID"],
  messagingSenderId: env["REACT_APP_FIREBASE_MESSAGING_SENDER_ID"],
  appId: env["REACT_APP_FIREBASE_APP_ID"],
  measurementId: env["REACT_APP_FIREBASE_MEASUREMENT_ID"]
};


class Firebase {
  constructor() {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth();
      this.storage = app.storage();
      this.db = app.database();
      this.firestore = app.firestore();

  }

  doCreateUserWithEmailAndPassword = async (email, password) =>  {
    let answer = await this.auth.createUserWithEmailAndPassword(email, password)
      .catch(error => {
          return error   
      })
      return answer
  }
    

  doSignInWithEmailAndPassword = async (email, password) => {    
    let ans = await this.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
        return error
    })
    return ans
  }

  doSignOut = async() => {
    let error = null
    try {
      await this.auth.signOut()
    }
    catch(er) {
      error = er.message
    }
    return error
  }

  doPasswordReset = async email => {
    let error = null
    try {
      await this.auth.sendPasswordResetEmail(email)
    }
    catch(er){
      error = er.message
    }
    return error

}


  getUserByEmail = async (email) => {
    const user = await this.firestore.collection("users").get().then(snapshot=>{
      let userByEmail = null
      snapshot.forEach(doc=> {
        let u = doc.data()
        if (u.email === email){
          userByEmail =  u
        }
      })
      return userByEmail
    })
    return user
}


  generateUserDocument = async (user) => {
    if (!user) {
      return;
    }
    const userRef = this.firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, service, location } = user;
      try {
        await userRef.set({
          displayName,
          email,
          service,
          location 
        });
      } catch (error) {
        alert(error.message)
      }
    } 
  };


generateDogWalkerDocument = async dogwalker => {
    if (!dogwalker) {
      return;
    }
    const userRef = this.firestore.doc(`dogwalkers/${dogwalker.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, service, price, rating, location, about } = dogwalker;
      try {
        await userRef.set({
          displayName,
          email,
          service,
          price,
          rating,
          location,
          about
        });
      } catch (error) {
        alert(error.message)
      }
    } 

}

generateBabysitterDocument = async babysitter => {
    if (!babysitter) {
      return;
    }
    const userRef = this.firestore.doc(`babysitters/${babysitter.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, service, price, rating, location, about } = babysitter;
      try {
        await userRef.set({
          displayName,
          email,
          service,
          price,
          rating,
          location,
          about
        });
      } catch (error) {
        alert(error.message)
      }
    } 
}

async getAllDogWalkers() {
  const snapshot = await this.firestore.collection('dogwalkers').get()
  let allDogWalkers = snapshot.docs.map(doc => doc.data());
  return allDogWalkers
}

async getAllDogWalkersByLocation(location) {
  const snapshot = await this.firestore.collection('dogwalkers').get()
  let allDogWalkersByLocation = []
  snapshot.docs.map(doc => {
    let dw = doc.data()
    if (dw.location === location){
      allDogWalkersByLocation.push(dw)
    }
  });
  return allDogWalkersByLocation
}


async getAllBabysitters() {
  const snapshot = await this.firestore.collection('babysitters').get()
  let allBabySitters = snapshot.docs.map(doc => doc.data());
  return allBabySitters
}

async getAllBabysittersByLocation(location) {
  const snapshot = await this.firestore.collection('babysitters').get()
  let allBabySittersByLocation = []
  snapshot.docs.map(doc => {
    let bs = doc.data()
    if (bs.location === location){
      allBabySittersByLocation.push(bs)
    }
  });
  return allBabySittersByLocation
}

getDogwalkerByEmail = async (email) => {
    const user = await this.firestore.collection("dogwalkers").get().then(snapshot=>{
      let dogWalkerByEmail = null
      snapshot.forEach(doc => {
        let u = doc.data()
        if(u.email === email){
          dogWalkerByEmail = u
        }
      })
      return dogWalkerByEmail
    })
    return user
}
  

  getBabysitterByEmail = async (email) => {
    const user = await this.firestore.collection("babysitters").get().then(snapshot=>{
      let babysitterByEmail = null
      snapshot.forEach( doc =>{
        let u = doc.data()
        if(u.email===email){
          babysitterByEmail =  u
        }
      })
      return babysitterByEmail
    })
    return user
  }

  
}

export default Firebase
