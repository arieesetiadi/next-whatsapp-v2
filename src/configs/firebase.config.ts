import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB6vNEiRAEQGkGEWPFAB1aOzVbTvMp9JZI',
  authDomain: 'whatsapp-v2-9f953.firebaseapp.com',
  projectId: 'whatsapp-v2-9f953',
  storageBucket: 'whatsapp-v2-9f953.appspot.com',
  messagingSenderId: '451894764296',
  appId: '1:451894764296:web:da09eff5064fa77c5782bd',
  measurementId: 'G-91LH4D8P7L',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();