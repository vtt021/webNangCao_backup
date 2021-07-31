
import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DescribeDialog from "./uploadDescribe";
import draftToHtml from 'draftjs-to-html';

export default function UploadContent(props) {
    const classes = useStyles();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        console.log(convertToRaw(editorState.getCurrentContent()))
        setEditorState(editorState)
    };

    const onSubmit = data => {
        axios.post("http://localhost:3001/api/users", {
            email: data.email,
            password: data.password,
            username: data.username
        }).then(res => {
            window.location.replace("/verify-otp/" + data.email)

        })
            .catch(error => console.log(error));
    }

    return (
        <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>

                    {/* Tên khóa học    */}
                    <Grid item xs={12}>
                        <TextField
                            name="courseName"
                            variant="filled"
                            required
                            fullWidth
                            id="courseName"
                            label="Tên khóa học"
                            autoFocus
                            {...register("courseName", { required: true })}
                        />
                    </Grid>
                    {errors.courseName && <span className='errors'>*Chưa nhập tên khóa học</span>}

                    {/* Mô tả ngắn */}
                    <Grid item xs={12}>
                        <TextField
                            name="detailShort"
                            variant="filled"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            id="detailShort"
                            label="Mô tả ngắn về khóa học"
                            {...register("detailShort", { required: true })}
                        />
                    </Grid>
                    {errors.detailShort && <span className='errors'>*Chưa có mô tả</span>}

                    {/* Học phí */}
                    <Grid item xs={12}>
                        <TextField
                            name="price"
                            variant="filled"
                            required
                            fullWidth
                            id="price"
                            label="Học phí"
                            {...register("price", { required: true })}
                        />
                    </Grid>
                    {errors.price && <span className='errors'>*Chưa có học phí</span>}

                    {/* Mô tả chi tiết (wysiwyg)*/}
                    <Grid
                        justify="flex-start" // Add it here :)
                        container
                        spacing={2}
                        item xs={12}
                    >
                        <Grid item>
                            <Typography variant='h5' color="inherit">
                                Mô tả chi tiết:
                            </Typography>
                        </Grid>

                        <Grid item>
                            <DescribeDialog editorState={editorState} onEditorStateChange={onEditorStateChange} />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}
                        justify="flex-start" // Add it here :)
                        container
                        className={classes.editorContent}
                    >
                        <div dangerouslySetInnerHTML={{
                            __html: draftToHtml(convertToRaw(editorState.getCurrentContent()))
                        }}>
                        </div>
                    </Grid>
                    {errors.price && <span className='errors'>*Chưa có mô tả</span>}

                </Grid>
                <Button
                    type="submit"
                    width='50%'
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Đăng khóa học
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    </Grid>
                </Grid>
            </form>
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
}));
