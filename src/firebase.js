import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDxv47r3vITRhDkbF15fXsmEfCcTm8Vnmg',
  authDomain: 'ecommerce-a82de.firebaseapp.com',
  projectId: 'ecommerce-a82de',
  storageBucket: 'ecommerce-a82de.appspot.com',
  messagingSenderId: '534351897276',
  appId: '1:534351897276:web:24435cdb10c9be42b1e6b9',
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, provider, db };
export default app;
