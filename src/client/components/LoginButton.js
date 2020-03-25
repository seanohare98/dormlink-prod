import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import MicrosoftSVG from '../../../public/ms-button-dark.svg';

const AuthButton = withStyles({
  root: {
    display: 'inline-block',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    transition: 'none'
  }
})(IconButton);

export default function LoginButton() {
  return (
    <AuthButton size='medium' href='/auth/azure'>
      <MicrosoftSVG />
    </AuthButton>
  );
}
