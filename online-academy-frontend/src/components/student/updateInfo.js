import React, { useEffect, useState } from "react";
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


export default function UpdateInfo() {
    const classes = useStyles();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    //Gọi API lấy tên với email của tài khoản nha
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("auth")))
    }, [localStorage.getItem("auth")])

    const onSubmit = async (data) => {
        console.log(data)
        await axios.put('http://localhost:3001/api/users', {
            password: data.password,
            email: data.email,
            username: data.username
        }, {
            headers: {
                'x-access-token': user.accessToken
            }
        }).then(res => {
            console.log("Success")
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        const init = async () => {
            await axios.get('http://localhost:3001/api/users/id?id=' + user.id)
                .then(res => {
                    let data = res.data;
                    console.log(data);
                    setUserData(data);




                }).catch(e => {
                    console.log(e);
                })
        }
        init();
    }, [])

    const handleUI = () => {
        if (userData === null) {
            return;
        }
        return (
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Cập nhật thông tin
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>

                        {/* Tên đăng nhập */}
                        <Grid item xs={12}>
                            <TextField
                                defaultValue={userData.username}
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
                                defaultValue={userData.email}
                                variant="filled"
                                required
                                fullWidth
                                id="email"
                                label="Địa chỉ Email"
                                name="email"
                                autoComplete="email"
                                type="email"
                                onChange={(event) => setValue('email', event.target.value)}

                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            />
                        </Grid>
                        {errors.email && <span className='errors'>*Email chưa đúng định dạng </span>}
                        <Grid item xs={12} >
                            <div style={{ display: "flex" }}>
                                <Typography variant='h6' style={{ marginRight: "auto", paddingBottom: '1%' }}>
                                    Nhập mật khẩu để xác nhận
                                </Typography>
                            </div>

                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register("password", { required: true, minLength: 1 })}
                            />
                        </Grid>
                        {errors.password && <span className='errors'>*Chưa nhập mật khẩu</span>}
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Cập nhật
                    </Button>
                </form>
            </div>
        )
    }

    return (
        <div maxWidth="xs">
            <CssBaseline />
            {
                handleUI()
            }
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
