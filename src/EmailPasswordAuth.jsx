import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebaseApp from './firebase';

const EmailPasswordAuth = ({ onSignIn }) => {
  const auth = getAuth(firebaseApp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);

      onSignIn();
      setUserLoggedIn(true);
      navigate('/'); 
    } catch (error) {
      console.error('Sign In error:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed up:', user);

      onSignIn();
      setUserLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error('Sign Up error:', error);
    }
  };

  return (
    <div className='inputs'>
      <h2>Email/Password Authentication</h2>
      <div className='email-input'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='email-button'>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignUp}>Sign Up</button>            
        </div>

        {userLoggedIn && <p>User logged in!</p>}        
      </div>
    </div>
  );
};

export default EmailPasswordAuth;