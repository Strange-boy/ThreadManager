import { initializeApp } from "firebase/app";

import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signOut, signInWithEmailAndPassword
} from 'firebase/auth'

import{
    getFirestore 
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBihK0GRqKruAiYqmGdBT51qD33pIe4OCo",
    authDomain: "threadman-66d1c.firebaseapp.com",
    databaseURL: "https://threadman-66d1c-default-rtdb.firebaseio.com",
    projectId: "threadman-66d1c",
    storageBucket: "threadman-66d1c.appspot.com",
    messagingSenderId: "184889305905",
    appId: "1:184889305905:web:f29e4b2003fecb15bb1e10"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
// console.log(app);

const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


const routes = {
    "login": "/public/",
    "home": "/public/addthread.html",
    "browseThread": "/public/browse.html",
    "signup": "/public/signup.html"
}
const currentRoute = window.location.pathname

const redirect = (path) => window.location.pathname = path

//inorder to check the current state of the users
window.addEventListener("DOMContentLoaded", () => {
    console.log("hello")
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            if (!uid) redirect(routes.login)
            // ...
        } else {
            // User is signed out
            // ...
            if (currentRoute !== routes.login && currentRoute !== routes.signup) 
                redirect(routes.login)
        }
    });
})

//inorder to direct the new users to add thread page
if (currentRoute === routes.signup) {

    const signupSubmit = document.querySelector('#signupform');
    // console.log(signupSubmit);

    signupSubmit.addEventListener('submit', (e) => {
        e.preventDefault();

        // console.log("hello");
        const emailSign = document.querySelector('#signupEmail').value;
        const passwordSign = document.querySelector('#signupPassword').value;
        // console.log(emailSign);
        // console.log(passwordSign);

        createUserWithEmailAndPassword(auth, emailSign, passwordSign)
            .then((cred) => {
                console.log("credential of user:", cred.user);
                // window.location.href = "../public/addthread.html";
                redirect("/public/addthread.html")
            })
            .catch((err) => {
                // console.log(err.message);
                alert(err.message);
            })
    });

    const redirectToLogin = document.querySelector('#singupLogin');
    // console.log(redirectToLogin);
    redirectToLogin.addEventListener('click',(e) => {
        e.preventDefault();
        document.location.pathname = routes.login;
    })
}

//inorder to perform login function
if (currentRoute === routes.login) {
    const loginSubmit = document.querySelector('#loginForm');

    loginSubmit.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailSign = document.querySelector('#loginEmail').value;
        const passwordSign = document.querySelector('#loginPassword').value;
        // console.log(emailSign);
        // console.log(passwordSign);
        signInWithEmailAndPassword(auth, emailSign, passwordSign)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                redirect(routes.home);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode);
            });
    })

}

//inorder to perform the logout function in the add thread page
if (currentRoute === routes.home) {

    //inorder to add the logout functionality for the user
    const logout = document.querySelector(".logOut")
    logout.addEventListener("click", () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("bei")
            redirect(routes.login)
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            alert(errorCode);
        });
    })

    //inorder to enable the user to add the thread of his choice

}

//inorder to perform the logout function in the browse thread page
if (currentRoute === routes.browseThread) {
    const logout = document.querySelector(".logOut")
    logout.addEventListener("click", () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("bei")
            redirect(routes.login)
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    })
}




