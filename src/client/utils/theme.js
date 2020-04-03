import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#cccccc',
      main: '#67c97a'
    }
  },
  overrides: {
    MuiRadio: {
      root: {
        display: 'inline-block',
        width: '100px',
        marginLeft: '50px'
      }
    },
    MuiTextField: {
      root: {
        display: 'inline-block',
        marginLeft: '100px'
      }
    }
  }
});

export default theme;
