import React, { useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import './Login.css';

export default function Login() {
    const classes = useStyles();
    const [loginStatus, setLoginStatus] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        localStorage.removeItem("auth")
        await axios.post(process.env.REACT_APP_API_MAIN + "/auth", {
            email: data.email,
            password: data.password
        }).then(res => {
            localStorage.setItem("auth", JSON.stringify(res.data))
            localStorage.setItem("time", new Date())
            if (res.data.role === 0)
            {
                console.log('hoc sinh')
                 window.location.replace("/")
            }
            else if (res.data.role === 1)
            {
                console.log('giao vien')
                window.location.replace("/teacher")
            }
            else if (res.data.role === 2)
            {
                console.log('admin')
                 window.location.replace("/admin")
            }
            //window.location.replace("/")

        })
            .catch(error => setLoginStatus(false));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    ????ng nh???p
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        onClick={(e) => { setLoginStatus(true) }}
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email ????ng k??"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    />
                    {errors.email && <span className='errors'>*Email ch??a ????ng ?????nh d???ng </span>}

                    <TextField
                        onClick={(e) => setLoginStatus(true)}
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="M???t kh???u"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password", { required: true, minLength: 1 })}
                    />
                    {errors.password && <span className='errors'>*Ch??a nh???p m???t kh???u</span>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        ????ng nh???p
                    </Button>
                    <Grid container>
                        <Grid className='left' item xs>
                            <Link href="/" variant="body2">
                                {"V??? trang ch???"}
                            </Link>
                        </Grid >
                        <Grid className='right' item >
                            <Link href="/signup" variant="body2">
                                {"Ch??a c?? t??i kho???n? ????ng k??"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Alert hidden={loginStatus} variant="outlined" display="none" severity="error" className={classes.loginFailed} >
                        ????ng nh???p th???t b???i!
                        Sai email ho???c m???t kh???u.
                    </Alert>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright ?? '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loginFailed: {
        margin: theme.spacing(3, 0, 3, 0),
    },
}));
