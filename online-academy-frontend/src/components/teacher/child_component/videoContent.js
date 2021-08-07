
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
export default function VideoContent(props) {
    const classes = useStyles();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

    const handleUploadClick = async event => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            props.setSelectedFile([reader.result])
        };
        let a = file.name;
        //console.log(file); // Would see a path?

        props.setSelectedFile(event.target.files[0]);
        console.log('xong r ne')
    };


    useEffect(async () => {

    }, []);

    return (
        <div className={classes.paper}>
            <Grid container xs={12} justify='flex-start'>
                <Grid item xs={2} />
                <Grid item xs={8} justify='flex-start'>
                    <form className={classes.form} noValidate onSubmit={handleSubmit(props.onSubmit)}>
                        {
                            props.completed && (
                                <Typography>
                                    ahihi
                                </Typography>
                            )
                        }
                        <Grid container spacing={2} justify='flex-start'>
                            {/* Tên bài giảng    */}
                            <Grid item xs={12}>
                                <TextField
                                    name="content"
                                    variant="filled"
                                    required
                                    fullWidth
                                    value={props.content}
                                    id={"content" + props.id}
                                    label="Tên bài giảng"
                                    autoFocus
                                    {...register("content", { required: true })}
                                />
                            </Grid>
                            {errors.content && <span className='errors'>*Chưa nhập tên bài giảng</span>}

                            {/* File video */}

                            <Grid item xs={12}>
                                <Typography variant='h5' align='left'>
                                    Tải lên video
                                </Typography>
                            </Grid>

                            <Grid item xs={12} justify='flex-start'>
                                <input
                                    name="video"
                                    id={'video' + props.id}
                                    accept="video/mp4,video/x-m4v,video/*"
                                    type="file"
                                    onChange={handleUploadClick}
                                />
                            </Grid>
                            <Grid container item xs={12} alignItems='center'>
                                <Typography variant='h5' align='left' className={classes.textAlign}>
                                    Cho phép xem trước:
                                </Typography>
                                <input
                                    name="isPreview"
                                    type='checkbox'
                                    value={props.isPreview}
                                    id={"isPreview" + props.id}
                                    className={classes.Checkbox}
                                    {...register("isPreview", {})}
                                />

                            </Grid>
                        </Grid>

                        <Grid container justify="center">
                            <Grid item>
                                <Button
                                    type="submit"
                                    width='50%'
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Lưu
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                </Grid>
                <Grid item xs={2} />
            </Grid>

        </div>

    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    editorContent: {
        border: '1px solid'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        //marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textAlign: {
        marginRight: '3%'
    },
    Checkbox: {
        width: '20px',
        height: '20px'
    }
}));
