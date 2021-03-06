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
import Refreshtoken from "../../refreshToken";
import AlertDialog from "../admin/common/Alert";

export default function UpdateInfo() {
    const classes = useStyles();
    const inputRef = React.useRef();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    //Gọi API lấy tên với email của tài khoản nha
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    const [userData, setUserData] = useState(null);
    const [isOpened, setOpen] = useState(false);
    const [isOpened2, setOpen2] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("auth")))
    }, [localStorage.getItem("auth")])

    const onSubmit = async (data) => {
        console.log(data)
        await axios.put(process.env.REACT_APP_API_MAIN + '/users', {
            password: data.password,
            email: data.email,
            username: data.username
        }, {
            headers: {
                'x-access-token': await Refreshtoken()
            }
        }).then(res => {
            console.log("Success")
            setOpen(true)
        }).catch(e => {
            console.log(e);
            setOpen2(true)
        });
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


    useEffect(() => {
        const init = async () => {
            await axios.get(process.env.REACT_APP_API_MAIN + '/users/id?id=' + user.id)
                .then(res => {
                    let data = res.data;
                    console.log(data);
                    setUserData(data);

                    setUsername(data.username);
                    setEmail(data.email);

                    setValue("username", data.username)
                    setValue("email", data.email)



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
                <AlertDialog close={() => { setOpen(false) }} isOpened={isOpened} value={"Cập nhật thành công"} />
                <AlertDialog close={() => { setOpen2(false) }} isOpened={isOpened2} value={"Cập nhật không thành công"} />
                <Typography component="h1" variant="h5">
                    Cập nhật thông tin
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
                                value={username}
                                onChangeCapture={e => {
                                    setUsername(e.target.value)
                                    setValue("username", e.target.value)
                                }}
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
                                value={email}

                                onChangeCapture={(event) => {
                                    setEmail(event.target.value);
                                    setValue('email', event.target.value)
                                }}

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
