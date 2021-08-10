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


export default function UpdatePass() {
    const classes = useStyles();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (watch("verifyPassword") != watch("newPassword")) {
            //Không làm gì cả
            console.log('Mật khẩu nhập chưa đúng')
        }
        else {
            console.log(data)
        }

        // await axios.post("http://localhost:3001/api/users", {
        //     password: data.password,
        //     username: data.username
        // }).then(res => {
        //     window.location.replace("/verify-otp/" + data.email)

        // })
        //     .catch(error => console.log(error));
    }

    return (
        <div maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Đổi mật khẩu
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} >
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu cũ"
                                type="password"
                                id="password"
                                {...register("password", { required: true, minLength: 1 })}
                            />
                        </Grid>
                        {errors.password && <span className='errors'>*Chưa nhập mật khẩu</span>}

                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                name="newPassword"
                                label="Mật khẩu mới"
                                type="password"
                                id="newPassword"
                                {...register("newPassword", { required: true, minLength: 6 })}

                            />
                        </Grid>
                        {errors.newPassword && <span className='errors'>*Mật khẩu tối thiểu 6 ký tự</span>}
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                name="verifyPassword"
                                label="Xác nhận mật khẩu mới"
                                type="password"
                                id="verifyPassword"
                                {...register("verifyPassword", { required: true})}

                            />
                        </Grid>
                        {(errors.verifyPassword || watch("verifyPassword") != watch("newPassword")) && <span className='errors'>*Mật khẩu không trùng khớp</span>}
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Xác nhận
                    </Button>
                </form>
            </div>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
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
