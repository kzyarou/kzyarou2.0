import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBFZApUZOlgJV0EvhsU6XvptnWS1Uzh8Jc',
  authDomain: 'kzyarou-9878e.firebaseapp.com',
  projectId: 'kzyarou-9878e',
  storageBucket: 'kzyarou-9878e.firebasestorage.app',
  messagingSenderId: '151870045590',
  appId: '1:151870045590:web:da92e13959003c094af1b7',
  measurementId: 'G-R6025LZLPX'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);