import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAKaEbtioFKlz5poNm-OMg8Csw5uYelEcI',
  authDomain: 'kzyarou-e4e86.firebaseapp.com',
  projectId: 'kzyarou-e4e86',
  storageBucket: 'kzyarou-e4e86.firebasestorage.app',
  messagingSenderId: '677747460955',
  appId: '1:677747460955:web:3ec7e141eff0b243f5687e',
  measurementId: 'G-92WQ9N7LME'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics only works in browser with supported env
isSupported().then((ok) => {
  if (ok) getAnalytics(app);
});

// The ONLY account allowed to access admin
export const ADMIN_EMAIL = 'anonadobo@gmail.com';