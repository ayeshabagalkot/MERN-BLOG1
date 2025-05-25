import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChzW-avJ6EK8kv8EjDN3WShv_iv-UDe0Y",
  authDomain: "blog-e7b0d.firebaseapp.com",
  projectId: "blog-e7b0d",
  storageBucket: "blog-e7b0d.firebasestorage.app",
  messagingSenderId: "894240222841",
  appId: "1:894240222841:web:897bacfc941e50a6b36ea8",
  measurementId: "G-C9KM8B8FKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }