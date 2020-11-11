import React, { useContext } from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { UserContext } from '../contexts/UserProvider';
import avatar from '../../../public/avatar.jpg';
import Redirect from 'react-router-dom/es/Redirect';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const transparentAppBar = withStyles({
  root: {
    background: 'transparent',
    boxShadow: 'none'
  }
})(AppBar);

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(6),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    color: '#67c97a'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [user, setUser] = useContext(UserContext);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    />
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button href='/'>
          <IconButton>
            <HomeIcon />
          </IconButton>
          <p>Homepage</p>
        </Button>
      </MenuItem>
      <MenuItem>
        <Button href='/about'>
          <IconButton>
            <InfoIcon />
          </IconButton>
          <p>About us</p>
        </Button>
      </MenuItem>
      {user.isComplete && (
        <MenuItem>
          <Button href='/profile'>
            <IconButton>
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </Button>
        </MenuItem>
      )}
      {user.sid && (
        <MenuItem>
          <Button href='/auth/logout'>
            <IconButton>
              <MeetingRoomIcon />
            </IconButton>
            <p>Logout</p>
          </Button>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <transparentAppBar position='static'>
        <Toolbar>
          <div className={classes.sectionDesktop}>
            <Button className={classes.title} variant='h6' href='/'>
              DormLink
            </Button>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button href='/about'>About Us</Button>
            {user.isComplete && (
              <IconButton edge='end' aria-controls={menuId} color='inherit'>
                <Link to='/profile'>
                  <Avatar classes={{ root: classes.avatarRoot }} src={avatar} />
                </Link>
              </IconButton>
            )}
            {user.email && (
              <MenuItem>
                <Button href='/auth/logout'>Logout</Button>
              </MenuItem>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-controls={mobileMenuId}
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </transparentAppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
