import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import GoogleButton from 'react-google-button';
import firebaseApp from './firebase';

const GoogleAuth = ({ onSignIn }) => {
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google authentication successful', user);
      setUserLoggedIn(true);
      onSignIn();
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div>
      <GoogleButton onClick={signInWithGoogle} />
      {userLoggedIn && <p>User logged in!</p>}
    </div>
  );
};

export default GoogleAuth;