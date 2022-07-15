// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
import { getFirestore, getDocs, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBihK0GRqKruAiYqmGdBT51qD33pIe4OCo",
    authDomain: "threadman-66d1c.firebaseapp.com",
    projectId: "threadman-66d1c",
    storageBucket: "threadman-66d1c.appspot.com",
    messagingSenderId: "184889305905",
    appId: "1:184889305905:web:f29e4b2003fecb15bb1e10"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

const db = getFirestore();
console.log(db);
//inorder to fetch the input values of the document



function getInputVal(id) {
    return document.getElementById(id).value;
}


async function  submitForm(e) {
    e.preventDefault();
    // console.log("hello world");
    var link = getInputVal("linkAddition");
    var category = getInputVal("addingCategory");

    // Add a new document in collection "cities"
    await setDoc(doc(db, "threadMan", "users"), {
        
    });
}

document.getElementById("add-thread").addEventListener('submit', submitForm);

