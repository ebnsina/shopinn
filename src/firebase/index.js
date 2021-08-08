import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUVGMhr7Ihk_1q9kss_FryBRRBXV-XkzA",
  authDomain: "shopinn-f765f.firebaseapp.com",
  projectId: "shopinn-f765f",
  storageBucket: "shopinn-f765f.appspot.com",
  messagingSenderId: "480675936839",
  appId: "1:480675936839:web:10254edf714824da2b4f62",
  measurementId: "G-G9R9NWJ3SR",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
