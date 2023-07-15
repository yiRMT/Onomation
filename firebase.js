// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXxH2axMpes_vDUX0nRNlacyskGzGa-kw",
  authDomain: "onomation-a17aa.firebaseapp.com",
  projectId: "onomation-a17aa",
  storageBucket: "onomation-a17aa.appspot.com",
  messagingSenderId: "168597602689",
  appId: "1:168597602689:web:846da57cc96f86c2226880"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the firebase app
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);