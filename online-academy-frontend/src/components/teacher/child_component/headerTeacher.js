import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Avatar,  } from '@material-ui/core';
import AppLogo from '../../common/images/AppLogo.png'
import { useHistory } from "react-router-dom";

export default function HeaderTeacher() {
    const classes = useStyles();
    const history = useHistory();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))

    const [auth, setAuth] = React.useState(user === null ? false : true);
    const [userAnchorEl, setUserAnchorEl] = React.useState(null); //Menu item


    const userOpen = Boolean(userAnchorEl);


    const handleRefresh = () => {
        window.location.href = "/teacher"
    };



    const handleUserMenu = (event) => {
        setUserAnchorEl(event.currentTarget);
    };
    const handleUserClose = () => {
        setUserAnchorEl(null);
    };
    const handleUserLogout = () => {
        localStorage.removeItem("auth")
        localStorage.removeItem("time")
        setUser(null)
        window.location.href = '/login'
    };


    useEffect(() => {
        if (user)
            console.log(user.accessToken)
    }, [])

    return (

        <div className={classes.grow}>

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

                    <div className={classes.grow} />
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
                                <MenuItem onClick={() => window.location.href = '/teacher'}>Trang chủ</MenuItem>
                                <MenuItem onClick={handleUserLogout}>Đăng xuất</MenuItem>
                            </Menu>
                        </div>
                    )}

                </Toolbar>
            </AppBar>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        paddingBottom: '3%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    loginButton: {
        marginRight: theme.spacing(2),
        "&:hover": {
            color: 'white'
        },
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