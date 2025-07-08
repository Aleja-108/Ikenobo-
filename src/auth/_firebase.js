// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCALAZn59DCW__pbUUHlAQkL7f9bbpb30g",
  authDomain: "prueba2-73adf.firebaseapp.com",
  projectId: "prueba2-73adf",
  storageBucket: "prueba2-73adf.firebasestorage.app",
  messagingSenderId: "28545231997",
  appId: "1:28545231997:web:86d1c1f88b087f7fa61514"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export function crearUsuario(email, password){

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed up 
        console.log("Credenciales", userCredential )
        const user = userCredential.user;
        console.log (user)
    // ...
  })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    // ..
  });
  }

  auth.useDeviceLanguage()
  export function logearG(){
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log("test", result)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        console.log("test error", error )
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

export function loginEmailPass(email, password){
    return(
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
            });
        })
    )
}

