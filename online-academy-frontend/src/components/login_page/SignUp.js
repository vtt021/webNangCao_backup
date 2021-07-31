import React from "react";
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
import './SignUp.css';


export default function SignUp() {
    const classes = useStyles();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        axios.post("http://localhost:3001/api/users", {
            email: data.email,
            password: data.password,
            username: data.username
        }).then(res => {
            window.location.replace("/verify-otp/"+data.email)

        })
            .catch(error => console.log(error));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng ký tài khoản
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>

                        {/* Tên đăng nhập */}
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="username"
                                variant="filled"
                                required
                                fullWidth
                                id="username"
                                label="Họ và tên người dùng"
                                autoFocus
                                {...register("username", { required: true })}
                            />
                        </Grid>
                        {errors.username && <span className='errors'>*Chưa nhập họ và tên</span>}

                        {/* Email */}
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                id="email"
                                label="Địa chỉ Email"
                                name="email"
                                autoComplete="email"
                                type="email"
                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            />
                        </Grid>
                        {errors.email && <span className='errors'>*Email chưa đúng định dạng </span>}

                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register("password", { required: true, minLength: 6 })}

                            />
                        </Grid>
                        {errors.password && <span className='errors'>*Mật khẩu tối thiểu 6 ký tự</span>}
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                name="verifyPassword"
                                label="Xác nhận mật khẩu"
                                type="password"
                                id="verifyPassword"
                                autoComplete="current-password"
                                {...register("verifyPassword", { required: watch("verifyPassword") === watch("password"), minLength: 6 })}

                            />
                        </Grid>
                        {errors.verifyPassword && <span className='errors'>*Mật khẩu không trùng khớp</span>}

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Đăng ký
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Đã có tài khoản? Đăng nhập
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
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
}));
