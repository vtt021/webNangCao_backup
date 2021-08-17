import React, { useState, useEffect } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Refreshtoken from "../../../refreshToken";
import AlertDialog from "../../admin/common/Alert";
const saltRounds = 10;

export default function UpdatePassTeacher() {
    const classes = useStyles();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    const [isOpened, setOpen] = useState(false);
    const [isOpened2, setOpen2] = useState(false);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("auth")))
    }, [localStorage.getItem("auth")])

    const onSubmit = async (data) => {
        await Refreshtoken();
        console.log(data);

        // data.currentPass = bcrypt.hashSync(data.newPass, saltRounds);
        // data.newPass = bcrypt.hashSync(data.newPass, saltRounds);
        // data.confirmPass = bcrypt.hashSync(data.confirmPass, saltRounds);
        // console.log(data.currentPass);
        // console.log(data.newPass);
        // console.log(data.confirmPass);
        if (watch("verifyPassword") != watch("newPassword")) {
            //Không làm gì cả
            console.log('Xác nhận mật khẩu không khớp')
            return;
        }

        let accessToken = JSON.parse(localStorage.getItem("auth")).accessToken;
        console.log(accessToken);


        await axios.put("http://localhost:3001/api/users/password", data, {
            headers: {
                'x-access-token': await Refreshtoken()
            }
        }).then(res => {
            setOpen(true)



        }).catch(error => {
            console.log(error)
            setOpen2(true)
        });
    }

    return (
        <div maxWidth="xs">
            <CssBaseline />
            <AlertDialog close={() => { setOpen(false) }} isOpened={isOpened} value={"Đổi mật khẩu thành công"} />
            <AlertDialog close={() => { setOpen2(false) }} isOpened={isOpened2} value={"Đổi mật khẩu thất bại"} />
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
                                name="currentPass"
                                label="Mật khẩu cũ"
                                type="password"
                                id="currentPass"
                                {...register("currentPass", { required: true, minLength: 1 })}
                            />
                        </Grid>
                        {errors.currentPass && <span className='errors'>*Chưa nhập mật khẩu</span>}

                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                name="newPass"
                                label="Mật khẩu mới"
                                type="password"
                                id="newPass"
                                {...register("newPass", { required: true, minLength: 6 })}

                            />
                        </Grid>
                        {errors.newPassword && <span className='errors'>*Mật khẩu tối thiểu 6 ký tự</span>}
                        <Grid item xs={12}>
                            <TextField
                                variant="filled"
                                required
                                fullWidth
                                name="confirmPass"
                                label="Xác nhận mật khẩu mới"
                                type="password"
                                id="confirmPass"
                                {...register("confirmPass", { required: true })}

                            />
                        </Grid>
                        {(errors.confirmPass || watch("confirmPass") != watch("newPass")) && <span className='errors'>*Mật khẩu không trùng khớp</span>}
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
