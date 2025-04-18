// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'financial-advisory-beb95.firebaseapp.com',
  projectId: 'financial-advisory-beb95',
  storageBucket: 'financial-advisory-beb95.firebasestorage.app',
  messagingSenderId: '82828843168',
  appId: '1:82828843168:web:9f4b73be86cbb8798391c5',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
