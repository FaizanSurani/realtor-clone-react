// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCarWw1lTPUWLqLayYlqLDMR_1pFXzD8jI",
  authDomain: "realtor-clone-60464.firebaseapp.com",
  projectId: "realtor-clone-60464",
  storageBucket: "realtor-clone-60464.appspot.com",
  messagingSenderId: "30958091453",
  appId: "1:30958091453:web:2b5456cb08e7c385134bd4",
  measurementId: "G-BKMK1WXHND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
