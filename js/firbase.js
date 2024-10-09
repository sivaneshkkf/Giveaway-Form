

const firebaseConfig = {
  apiKey: "AIzaSyCxi-fb58iwF8aYBb9iwPkDj2uKeFgEuLI",
  authDomain: "giveaway-form.firebaseapp.com",
  projectId: "giveaway-form",
  storageBucket: "giveaway-form.appspot.com",
  messagingSenderId: "740238200144",
  appId: "1:740238200144:web:0f5cad2d052b26ce377055"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

const auth = firebase.auth();

const COLLECTION_NAME = "requests"


// Reference a Firestore collection and add a document
const createRecord = (record) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
    .add(record)
    .then((docRef) => {
      resolve(docRef)
    })
    .catch((error) => {
      reject(error)
    });
  })
}



const loginUser = (email,password) => {

  return new Promise((resolve,reject) => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      resolve(user)
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
  
      reject({errorCode,errorMessage})
      // ..
    });
  })
 
}


const tdata= document.getElementById("tdata")

function getAllRequest() {
let index =0;

return new Promise((resolve,reject) => {
  db.collection(COLLECTION_NAME)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());

    });

    resolve(querySnapshot);
  }).catch(e => {
    reject(e)
  });
})
  
}


  