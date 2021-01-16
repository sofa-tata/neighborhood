import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import 'firebase/database';
import "firebase/storage";


//old

// var firebaseConfig = {
//     apiKey: "AIzaSyA1-nLFHmNaYbzJXBO_gl636a-iCbZsIEY",
//     authDomain: "neighborhood-auth.firebaseapp.com",
//     projectId: "neighborhood-auth",
//     storageBucket: "neighborhood-auth.appspot.com",
//     messagingSenderId: "1082706672806",
//     appId: "1:1082706672806:web:8b511d80cd1a38ddb78867",
//     measurementId: "G-M0ZPJSD1GP"
// };

//new
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
  doCreateUserWithEmailAndPassword = async (email, password) => {
  let error = null
    try{
      this.auth.createUserWithEmailAndPassword(email, password)
    }
    catch(er){
      error = er.message
    }
    return error
  // this.auth.createUserWithEmailAndPassword(email, password).catch(error => {
  //     alert(error.message)
  // })
  }
  doSignInWithEmailAndPassword = async (email, password) =>{
    
  // const snapshot = await this.firestore.collection('dogwalkers').get()
  // let arr = snapshot.docs.map(doc => doc.data());
  // console.log("arr", arr);
  // return arr
    await this.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
        // alert(error.message)
    })
    // console.log("sign in user:",user)
    //get user by email
    const user = await this.getUserByEmail(email)
    console.log("sign in user:",user)
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
  //   .then({
  //   })
  //   .catch(error => {
  //   // alert(error.message)
  // })
}

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password).catch(error => {
        // alert(error.message)
    })


  // generateUserDocument = user => {
  //   const a = this.db.ref(`users/${user.id}`)
  //   a.set(user);
  // }

  getUserByEmail = async (email) => {
    console.log('getUserByEmail goes in - email:', email)
    const user = await this.firestore.collection("users").get().then(snapshot=>{
      let userToReturn = null
      snapshot.forEach(doc=>{
        let u = doc.data()
        // console.log('u', u)
        // console.log(u)
        if(u.email===email){
          console.log('found email', email)
          userToReturn =  u
        }
      })
      return userToReturn
    })
    console.log('user end ', user)
    return user
      
    //   'value', (snapshot) => {
    //   console.log('snapshot', snapshot)
    //     snapshot.forEach((data) => {
    //         var user = data.val();
    //         console.log("getUserByEmail - user", user)
    //         if (user.email === email) {
    //             user1 = user
    //         }
    //     });
    // })

    // return promise.then(function(result) {
    //   console.log('user1', user1)
    //     return user1
    //  }, err => {
    //     console.log("promise err:", err)
    //  });
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
          // photoURL
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    } else {
      console.log('snapshot exists')
    }
    // return getUserDocument(user.uid);
  };
// getUserDocument = async uid => {
//     if (!uid) return null;
//     try {
//       const userDocument = await this.firestore.doc(`users/${uid}`).get();
//       return {
//         uid,
//         ...userDocument.data()
//       };
//     } catch (error) {
//       console.error("Error fetching user", error);
//     }

    

//   };

generateDogWalkerDocument = async dogwalker => {
  // let uid = uuidv4();
  // const a = this.db.ref(`dogwalkers/${dogwalker.uid}`)
  // a.set(dogwalker);
  console.log('dogwalker', dogwalker)
  console.log('generateDogWalkerDocument')
    if (!dogwalker) {
      console.log('smth')
    return;
    }
    const userRef = this.firestore.doc(`dogwalkers/${dogwalker.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, service, price, rating, location } = dogwalker;
      try {
        await userRef.set({
          displayName,
          email,
          service,
          price,
          rating,
          location
          // photoURL
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    } else {
      console.log('snapshot exists')
    }
    // return getUserDocument(user.uid);
}

async getAllDogWalkers() {
  const snapshot = await this.firestore.collection('dogwalkers').get()
  let arr = snapshot.docs.map(doc => doc.data());
  console.log("getAllDogWalkers - arr", arr);
  return arr
}

async getAllDogWalkersByLocation(location) {
  const snapshot = await this.firestore.collection('dogwalkers').get()
  let arr = []
  snapshot.docs.map(doc => {
    let dw = doc.data()
    if (dw.location === location){
      arr.push(dw)
    }
  });
  // console.log("arr", arr);
  // return arr
  
  console.log("getAllDogWalkersByLocation - arr1", arr);
  return arr
}


async getAllBabysitters() {
  const snapshot = await this.firestore.collection('babysitters').get()
  let arr = snapshot.docs.map(doc => doc.data());
  console.log("getAllBabysitters - arr", arr);
  return arr
}

async getAllBabysittersByLocation(location) {
  const snapshot = await this.firestore.collection('babysitters').get()
  let arr = []
  snapshot.docs.map(doc => {
    let bs = doc.data()
    if (bs.location === location){
      arr.push(bs)
    }
    console.log("getAllBabysittersByLocation - arr", arr);
    return arr
  });
  // console.log("arr", arr);
  // return arr
}

// async getAllDogWalkers(){
//   const arr = []
//   const response=this.db.ref('dogwalkers');
//   console.log("response", response);
//   console.log('getAllDogWalkers goes in')
//     let user1 = null
//     let promise = this.db.ref("dogwalkers").once('value', (snapshot) => {
//       console.log('snapshot', snapshot)
//         snapshot.forEach((data) => {
//           arr.push(data.val)
//           console.log('array', arr)
//         });
//       });
// }
  // const data=await response.get();
  // console.log("data", data);
  // console.log("data.docs", data.docs)
  // data.docs.forEach(item=>{
  // //  setBlogs([...blogs,item.data()])
  // console.log(item.data());
  // arr.push(item.data())
  
  
  // })
  // return arr


// generateDogWalkerDocument = async (dogwalker) => {
//     if (!dogwalker) return;
//     let uid = uuidv4();
//     const userRef = firestore.doc(`dogwalkers/${uid}`);
//     const snapshot = await userRef.get();
//     if (!snapshot.exists) {
//       const { name, email, price, rating } = dogwalker;

//       try {
//         await userRef.set({
//           name,
//           email,
//           price,
//           rating
//         });
//       } catch (error) {
//         console.error("Error creating user document", error);
//       }
//     }
//     return getDogWalkerDocument(uid);
//   };
getDogWalkerById = async uid => {
  let dogWalker1 = null
  let promise = this.db.ref("dogwalkers").once('value', (snapshot) => {
      snapshot.forEach((data) => {
          let dogWalker = data.val();
          if (dogWalker.uid === uid) {
              dogWalker1 = dogWalker
          }
      });
  })

  return promise.then(function(result) {
      return dogWalker1
   }, err => {
      // console.log("promise err:", err)
   });
  };

getDogwalkerByEmail = async (email) => {
  console.log('getUserByEmail goes in - email', email)
    const user = await this.firestore.collection("dogwalkers").get().then(snapshot=>{
      let userToReturn = null
      snapshot.forEach(doc=>{
        let u = doc.data()
        // console.log('u', u)
        // console.log(u)
        if(u.email===email){
          console.log('found email', email)
          userToReturn =  u
        }
      })
      return userToReturn
    })
    console.log('user end ', user)
    return user
    // let user1 = null
    // let promise = this.db.ref("dogwalkers").once('value', (snapshot) => {
    //     snapshot.forEach((data) => {
    //         var user = data.val();
    //         if (user.email === email) {
    //             user1 = user
    //         }
    //     });
    // })

    // return promise.then(function(result) {
    //     return user1
    //  }, err => {
    //     // console.log("promise err:", err)
    //  });
}


generateBabysitterDocument = async babysitter => {
  // let uid = uuidv4();
  // const a = this.db.ref(`babysitters/${uid}`)
  // a.set(babysitter);

  console.log('babysitter', babysitter)
  console.log('generateBabysitterDocument')
    if (!babysitter) {
      console.log('smth')
    return;
    }
    const userRef = this.firestore.doc(`babysitters/${babysitter.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, service, price, rating, location } = babysitter;
      try {
        await userRef.set({
          displayName,
          email,
          service,
          price,
          rating,
          location
          // photoURL
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    } else {
      console.log('snapshot exists')
    }
    // return getUserDocument(user.uid);
}

// generateBabysitterDocument = async (babysitter) => {
//     if (!babysitter) return;
//     let uid = uuidv4();
//     const userRef = firestore.doc(`babysitters/${uid}`);
//     const snapshot = await userRef.get();
//     if (!snapshot.exists) {
//       const { name, email, service, price, rating } = babysitter;

//       try {
//         await userRef.set({
//           name,
//           email,
//           service,
//           price,
//           rating
//         });
//       } catch (error) {
//         console.error("Error creating user document", error);
//       }
//     }
//     return getBabysitterDocument(uid);
//   };
getBabysitterById = async uid => {
  let babysitter1 = null
  let promise = this.db.ref("babysitters").once('value', (snapshot) => {
      snapshot.forEach((data) => {
          let babysitter = data.val();
          if (babysitter.uid === uid) {
            babysitter1 = babysitter
          }
      });
  })

  return promise.then(function(result) {
      return babysitter1
   }, err => {
      // console.log("promise err:", err)
   });
  };
  
  getBabysitterByEmail = async (email) => {
    console.log('getUserByEmail goes in - email', email)
      const user = await this.firestore.collection("babysitters").get().then(snapshot=>{
        let userToReturn = null
        snapshot.forEach(doc=>{
          let u = doc.data()
          // console.log('u', u)
          // console.log(u)
          if(u.email===email){
            console.log('found email', email)
            userToReturn =  u
          }
        })
        return userToReturn
      })
      console.log('user end ', user)
      return user
    }

//   getBabysitterByEmail = async (email) => {
//     let user1 = null
//     let promise = this.db.ref("babysitters").once('value', (snapshot) => {
//         snapshot.forEach((data) => {
//             var user = data.val();
//             if (user.email === email) {
//                 user1 = user
//             }
//         });
//     })

//     return promise.then(function(result) {
//         return user1
//      }, err => {
//         // console.log("promise err:", err)
//      });
// }

  // export const getAllDogWalkers = () => {
  //   firestore.ref("dogwalkers").on("value", snapshot => {
  //     let allDogwalkers = [];
  //     snapshot.forEach(snap => {
  //       allDogwalkers.push(snap.val());
  //     });
  //     this.setState({ dogwalkers: allDogwalkers });
  //   });  
  // }

}
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
// export const db = firebase.database();

export default Firebase
