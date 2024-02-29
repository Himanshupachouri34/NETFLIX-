import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCbLEXx55uEbVvFn4Gz29udswVXFn7QvJQ",
  authDomain: "netflix-2be65.firebaseapp.com",
  projectId: "netflix-2be65",
  storageBucket: "netflix-2be65.appspot.com",
  messagingSenderId: "798224991501",
  appId: "1:798224991501:web:0e07b66f2a66c7c41d9c44"
};

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);

export { authentication };