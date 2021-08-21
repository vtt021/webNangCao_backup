import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import {useHistory} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import './Login.css';
import { useParams } from "react-router-dom";
export default function Verifyotp(props) {
    const { email } = useParams()
    console.log(email)

    const classes = useStyles();
    const history = useHistory();

    const [loginStatus, setLoginStatus] = useState(true)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axios.post(process.env.REACT_APP_API_MAIN + "/users/verify-otp", {
            email: email,
            token: data.otp
        }).then(res => {
            console.log(data)
            window.location.replace("/login")

        }).catch(error => { console.log(error); setLoginStatus(false) });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h5" style={{ display: "flex", alignItems: "baseline" }}>
                    Chúng tôi đã gửi mã OTP đến địa chỉ:  {'\u00A0'}
                    {email}
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        onClick={(e) => { setLoginStatus(true) }}
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="otp"
                        label="OTP"
                        name="otp"
                        autoComplete="otp"
                        autoFocus
                        {...register("otp", { required: true, pattern: /[0-9]/ })}
                    />
                    {errors.otp && <span className='errors'>Mã xác nhận sai định dạng </span>}


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Xác nhận
                    </Button>
                    <Grid className='left' item xs>
                        <Link onClick={() => history.goBack()} variant="body2">
                            {"Quay lại"}
                        </Link>
                    </Grid >
                    <div hidden={loginStatus}>
                        <Alert variant="outlined" display="none" severity="error" className={classes.optFailed}>
                            Sai mã xác nhận
                        </Alert>
                        <Grid container>
                            <Grid item xs>
                                <Button color="primary">Gửi lại</Button>
                            </Grid >

                        </Grid>
                    </div>

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
            {'Copyright © '}
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
    optFailed: {
        margin: theme.spacing(3, 0, 3, 0),
    },
}));
