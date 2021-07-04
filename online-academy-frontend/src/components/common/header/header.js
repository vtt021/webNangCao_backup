import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, Avatar, TextField, InputAdornment } from '@material-ui/core';
import AppLogo from '../images/AppLogo.png'
import Fade from '@material-ui/core/Fade';
import Categories from './components/categories.js'
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  loginButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.45),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',

  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBarStyte: {

    background: '#383E56 '
  },
}));

export default function Header() {
  const classes = useStyles();

  const [auth, setAuth] = React.useState(true);

  const [userAnchorEl, setUserAnchorEl] = React.useState(null); //Menu item

  const [authAdmin, setAuthAdmin] = React.useState(true);

  const userOpen = Boolean(userAnchorEl);

  const [categoriesAnchorEl, setCategoriesAnchorEl] = React.useState(null);
  const categoriesOpen = Boolean(categoriesAnchorEl);

  const handleRefresh = () => {
    // về lại trang chủ
    window.location.href = '/';
  };

  const handleChangeAuth = (event) => {
    setAuth(event.target.checked);
  };
  const handleChangeAuthAdmin = (event) => {
    setAuthAdmin(event.target.checked);
  };

  const handleUserMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleUserClose = () => {
    setUserAnchorEl(null);
  };



  const handleCategoriesMenu = (event) => {
    
    setCategoriesAnchorEl(event.currentTarget);
  };

  const handleCloseCategories = () => {
    setCategoriesAnchorEl(null);
  };



  return (
    <div className={classes.grow}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChangeAuth} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={authAdmin} onChange={handleChangeAuthAdmin} aria-label="login switch" />}
          label={authAdmin ? 'admin' : 'Noadmin'}
        />
      </FormGroup>
      <AppBar position="relative" className={classes.appBarStyte} >
        <Toolbar>
          {/* Logo nè */}
          <div onClick={handleRefresh}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              disableFocusRipple="false"
            >
              <Avatar src={AppLogo} className={classes.menuButton} />
              <Typography className={classes.title} variant="h6" noWrap>
                My Academy
              </Typography>
            </IconButton>
          </div>


          <div onClick={() => { console.log('gọi lệnh search nè') }}>
            <InputBase id="standard-basic" className={classes.search}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              placeholder="Search…"
              endAdornment={
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <Categories/>

          <div className={classes.grow} />
          {!auth && (
            <div>
              <Button variant="contained" color="primary" href="/login" className={classes.loginButton}>
                Đăng nhập
              </Button>
            </div>
          )}
          {
            authAdmin && (
              <div>
              <Button variant="contained" color="primary" href="/admin" className={classes.loginButton}>
                Admin
              </Button>
            </div>
            )
          }
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu} //Show menu user.
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={userAnchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={userOpen}
                onClose={handleUserClose}
              >
                <MenuItem onClick={handleUserClose}>Profile</MenuItem>
                <MenuItem onClick={handleUserClose}>My account</MenuItem>
              </Menu>
            </div>
          )}

        </Toolbar>
      </AppBar>
    </div>
  );
}