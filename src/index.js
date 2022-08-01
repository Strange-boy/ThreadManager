let curr_uid = "";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlS8VgfBereAPgMAuwNP1CoMz2jf1WdNA",
  authDomain: "thread-manager-b1ea8.firebaseapp.com",
  projectId: "thread-manager-b1ea8",
  storageBucket: "thread-manager-b1ea8.appspot.com",
  messagingSenderId: "349428523788",
  appId: "1:349428523788:web:445f54a31bb9bae483df29",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// console.log(app);

const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const routes = {
  login: "/public/",
  home: "/public/addthread.html",
  browseThread: "/public/browse.html",
  signup: "/public/signup.html",
};
const currentRoute = window.location.pathname;

const redirect = (path) => (window.location.pathname = path);

//inorder to check the current state of the users
window.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      curr_uid = user.uid;
    } else {
      // User is signed out

      if (currentRoute !== routes.login && currentRoute !== routes.signup)
        redirect(routes.login);
    }
  });
});

//inorder to direct the new users to add thread page
if (currentRoute === routes.signup) {
  const signupSubmit = document.querySelector("#signupform");
  // console.log(signupSubmit);

  signupSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    // console.log("hello");
    const emailSign = document.querySelector("#signupEmail").value;
    const passwordSign = document.querySelector("#signupPassword").value;

    createUserWithEmailAndPassword(auth, emailSign, passwordSign)
      .then((cred) => {
        // console.log("credential of user:", cred.user);
        redirect("/public/addthread.html");
      })
      .catch((err) => {
        // console.log(err.message);
        alert(err.message);
      });
  });

  const redirectToLogin = document.querySelector("#singupLogin");
  // console.log(redirectToLogin);
  redirectToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    document.location.pathname = routes.login;
  });
}

//inorder to perform login function
if (currentRoute === routes.login) {
  const loginSubmit = document.querySelector("#loginForm");

  loginSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailSign = document.querySelector("#loginEmail").value;
    const passwordSign = document.querySelector("#loginPassword").value;
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
  });
}

//inorder to perform the logout function in the add thread page
if (currentRoute === routes.home) {
  //inorder to add the logout functionality for the user
  const logout = document.querySelector(".logOut");
  logout.addEventListener("click", () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("bei");
        redirect(routes.login);
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        alert(errorCode);
      });
  });

  //event listener pointing to the submit button
  const addthreads = document.querySelector("#add-thread");
  // console.log(addthreads);
  addthreads.addEventListener("submit", (e) => {
    e.preventDefault();
    const linkAdded = addthreads.link.value;
    const categoryAdded = addthreads.category.value;
    console.log(linkAdded);

    const userRef = collection(db, "users", curr_uid, categoryAdded);

    addDoc(userRef, {
      link: linkAdded,
    })
      .then(() => {
        alert("Tweemae saved the link");
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

//inorder to perform the logout function in the browse thread page
if (currentRoute === routes.browseThread) {
  const logout = document.querySelector(".logOut");
  logout.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("bei");
        redirect(routes.login);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  });

  const browse = document.querySelector("#browseThread");
  browse.addEventListener("click", (e) => {
    e.preventDefault();

    const category = browse.cat.value;
    const colRef = collection(db, "users", curr_uid, category);

    // const convtLink = linkAdded.replaceAll("//","_");
    // console.log(convtLink)
    // const userRef = collection(db, "users", curr_uid, convtLink);


    // Create a query against the collection.

    const q = query(colRef, where("link", "!=", ""));
    let people = [];


    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        people.push({ ...doc.data() });
      });

      console.log(people);

      let tweetContent = people.map((tweets) => {
        return tweets.link;
      }).join(" ");

      console.log(tweetContent);

      let tweetHtmlPage = document.querySelector('.tweet-content');
      tweetHtmlPage.innerHTML = tweetContent;
    })

    console.log("hello")
  });
}
