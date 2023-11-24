import React from 'react';
import EmailPasswordAuth from './EmailPasswordAuth';
import GoogleAuth from './GoogleAuth';

const AuthContainer = ({ onSignIn }) => {
  return (
    <div className='main'>
      <EmailPasswordAuth onSignIn={onSignIn} />
      <GoogleAuth onSignIn={onSignIn} />
    </div>
  );
};

export default AuthContainer;