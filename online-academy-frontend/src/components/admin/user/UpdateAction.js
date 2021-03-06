import React,{useState} from "react";
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
import Refreshtoken from '../../../refreshToken';
import './CreateTeacher.css';
import AlertDialog from '../common/Alert';

export default function CreateTeacher() {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [auth,setAuth] = useState(JSON.parse(localStorage.getItem("auth")))
    const [open, setOpen] = useState(false);
    const onSubmit = async (value) => {
            Refreshtoken()
            const body = {
                email: value.email,
                password: "123456",
                username: value.username
            }
            await axios.post(process.env.REACT_APP_API_MAIN + "/users/teacher-acc", body,{
                headers: {
                    'x-access-token': await Refreshtoken()
                },
               
            }).then(res => {
                window.location.replace("/admin/users")

            })
                .catch(error => setOpen(true));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <AlertDialog close={()=>{setOpen(false)}} isOpened={open} value={"Email này đã tồn tại"}/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Tạo tài khoản giáo viên
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
