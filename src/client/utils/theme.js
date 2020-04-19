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
        width: '100px'
      }
    },
    MuiTextField: {
      root: {
        display: 'inline-block'
      }
    }
  }
});

export default theme;
