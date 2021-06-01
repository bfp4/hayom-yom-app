import firebase from "@firebase/app"
import "@firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyCnnNxFlm--1ADilwxyY6Sif_zZVAgpZSQ",
    authDomain: "hayom-yom-issues-47f8f.firebaseapp.com",
    projectId: "hayom-yom-issues-47f8f",
    storageBucket: "hayom-yom-issues-47f8f.appspot.com",
    messagingSenderId: "435610672739",
    appId: "1:435610672739:web:6aee2db0af6abb9a1ce256",
    measurementId: "G-GLWQD9BDRD"
};

const firestore = firebase.default.initializeApp(firebaseConfig).firestore();

export { firestore }