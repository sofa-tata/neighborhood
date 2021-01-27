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
  doCreateUserWithEmailAndPassword = (email, password) => 
      this.auth.createUserWithEmailAndPassword(email, password).catch(error => {
        alert(error.message)
    })
 


  doSignInWithEmailAndPassword = async (email, password) =>{
    
    await this.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
        alert(error.message)
    })
    const user = await this.getUserByEmail(email)
    return user
  }

  doSignOut = () => {
    this.auth.signOut().catch(error => {
        // alert(error.message)
    })
  }

  doPasswordReset = async email => {
    let error = null
    try{
    await this.auth.sendPasswordResetEmail(email)
    }
    catch(er){
      error = er.message
    }
    return error

}

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password).catch(error => {
        // alert(error.message)
    })


  getUserByEmail = async (email) => {
    console.log('getUserByEmail goes in - email:', email)
    const user = await this.firestore.collection("users").get().then(snapshot=>{
      let userByEmail = null
      snapshot.forEach(doc=>{
        let u = doc.data()
        console.log('u', u.email)
        console.log('equals', u.email === email)
        if(u.email===email){
          console.log('found email', email)
          userByEmail =  u
        }
      })
      return userByEmail
    })
    console.log('user end ', user)
    return user
}


  generateUserDocument = async (user) => {
  console.log('user', user)
  console.log('generateUserDocument')
    if (!user) {
      console.log('smth')
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
        console.error("Error creating user document", error);
      }
    } else {
      console.log('snapshot exists')
    }

  };


generateDogWalkerDocument = async dogwalker => {

  console.log('dogwalker', dogwalker)
  console.log('generateDogWalkerDocument')
    if (!dogwalker) {
      console.log('smth')
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
        console.error("Error creating user document", error);
      }
    } else {
      console.log('snapshot exists')
    }

}

generateBabysitterDocument = async babysitter => {

  console.log('babysitter', babysitter)
  console.log('generateBabysitterDocument')
    if (!babysitter) {
      console.log('smth')
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
        console.error("Error creating user document", error);
      }
    } else {
      console.log('snapshot exists')
    }
}

async getAllDogWalkers() {
  const snapshot = await this.firestore.collection('dogwalkers').get()
  let allDogWalkers = snapshot.docs.map(doc => doc.data());
  console.log("getAllDogWalkers - allDogWalkers", allDogWalkers);
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
  
  console.log("getAllDogWalkersByLocation - allDogWalkersByLocation",
  allDogWalkersByLocation);
  return allDogWalkersByLocation
}


async getAllBabysitters() {
  const snapshot = await this.firestore.collection('babysitters').get()
  let allBabySitters = snapshot.docs.map(doc => doc.data());
  console.log("getAllBabysitters - allBabySitters", allBabySitters);
  return allBabySitters
}

async getAllBabysittersByLocation(location) {
  console.log('getAllBabysittersByLocation(location)', location)
  const snapshot = await this.firestore.collection('babysitters').get()
  let allBabySittersByLocation = []
  snapshot.docs.map(doc => {
    let bs = doc.data()
    console.log('bs.loc', bs.location)
    console.log('bs.location === location', bs.location === location)
    if (bs.location === location){
      allBabySittersByLocation.push(bs)
    }
  });

  console.log("getAllBabysittersByLocation - allBabySittersByLocation", allBabySittersByLocation);
    return allBabySittersByLocation
}

getDogwalkerByEmail = async (email) => {
  console.log('getDogwalkerByEmail goes in - email', email)
    const user = await this.firestore.collection("dogwalkers").get().then(snapshot=>{
      let dogWalkerByEmail = null
      snapshot.forEach(doc => {
        let u = doc.data()
        console.log('u', u.email)
        console.log('equals', u.email === email)
        if(u.email === email){
          console.log('found email', email)
          dogWalkerByEmail = u
        }
      })
      return dogWalkerByEmail
    })
    console.log('user end ', user)
    return user
}
  

  getBabysitterByEmail = async (email) => {
    console.log('getUserByEmail goes in - email', email)
      const user = await this.firestore.collection("babysitters").get().then(snapshot=>{
        let babysitterByEmail = null
        snapshot.forEach(doc=>{
          let u = doc.data()
          if(u.email===email){
            console.log('found email', email)
            babysitterByEmail =  u
          }
        })
        return babysitterByEmail
      })
      console.log('user end ', user)
      return user
    }
}

export default Firebase
