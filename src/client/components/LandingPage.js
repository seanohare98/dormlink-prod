import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Background from '../../../public/background.png';
import Logo from '../../../public/logo.png';
import SignIn from '../../../public/sign-in.png';
import LoginButton from './LoginButton';

const LandingContainer = withStyles({
  root: {
    height: '100vh',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    textAlign: 'center'
  }
})(Container);

const LandingPage = () => {
  return (
    <LandingContainer maxWidth='xl'>
      <div id='home-container'>
        <div id='inner'>
          <img src={Logo} alt='dormlink-logo img' id='logo' />
          <h1 className='landing-header'>Find Your Roommate!</h1>
          <p className='subtitle'>
            A social network made by students, for students
          </p>
          <LoginButton />
        </div>
        <div id='illustration'>
          <img src={SignIn} alt='sign-up img' id='sign-in' />
        </div>
      </div>
    </LandingContainer>
  );
};

export default LandingPage;
