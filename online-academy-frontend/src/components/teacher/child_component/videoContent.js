
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
import { Link } from '@material-ui/core';
export default function VideoContent(props) {
    const classes = useStyles();
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm();
    // const [title, setTitle] = useState("asd")

    const ref = React.useRef();

    const handleResetVid = () => {
        ref.current.value = ""
    }

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
        props.setFileName(a);
        console.log('xong r ne')
    };

    // useEffect(() => {
    //     // console.log("content", props.content)
    //     console.log("abcd")
    //     // setTitle(props.content == null ? "abc": props.content.content)
    //     if (props.content != null) {
    //         // setTitle(props.content.content)
    //         console.log("Here")
    //         console.log(getValues())
    //         setValue("content" + props.content._id, Math.random())
    //     }
    // }, [props.content])

    // useEffect(() => {
    //     console.log("Title changed")
    // }, [])

    useEffect(() => {
        if (props.content != null) {
            handleResetVid();
        }
    }, [props.content])


    useEffect(async () => {

        // console.log("content", props.content)

    }, []);



    const handleUI = () => {
        if (props.content == null) {
            return;
        }
        return (
            <Grid container spacing={2} justify='flex-start'>
                {/* Tên bài giảng    */}
                <Grid item xs={12}>
                    <TextField
                        name="content"
                        variant="filled"
                        required
                        fullWidth
                        value={props.title}
                        // defaultValue={props.title}
                        id={"content" + props.content._id}
                        onChangeCapture={e => {
                            props.setTitle(e.target.value)
                        }}
                        label="Tên bài giảng"
                        autoFocus
                        {...register("content", { required: true })}
                    />
                </Grid>
                {errors.content && <span className='errors'>*Chưa nhập tên bài giảng</span>}

                {/* File video */}

                <Grid container item xs={12}>
                    <Typography variant='h5' align='left' style={{ paddingRight: '3%' }}>
                        {'Tải lên video: '}
                    </Typography>
                    {
                        props.completed != false && (
                            <Link align='left'
                                rel="noopener noreferrer" target="_blank" variant='h6'
                                href={process.env.REACT_APP_API_MAIN + '/files/download?fileName=' + props.oldVideo}
                            >
                                Video hiện tại
                            </Link>
                        )
                    }

                </Grid>

                <Grid item xs={12} justify='flex-start'>
                    <input
                        name="video"
                        ref={ref}
                        id={'videoInput'}
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
                        // value={props.isPreview}
                        checked={props.isPreview}
                        id={"isPreview" + props.id}
                        className={classes.Checkbox}
                        // onChange={e => {
                        //     console.log(e.target.value)
                        // }}
                        onChangeCapture={e => {
                            props.setIsPreview(!props.isPreview)
                            // console.log(e.target.value)
                        }}
                        {...register("isPreview", {})}
                    />

                </Grid>
            </Grid>

        )
    }

    return (
        <div className={classes.paper}>
            <Grid container xs={12} justify='flex-start'>
                <Grid item xs={2} />
                <Grid item xs={8} justify='flex-start'>
                    <form className={classes.form} noValidate>
                        {
                            handleUI()
                        }
                        <Grid container justify="center">
                            <Grid item>
                                <Button
                                    type="reset"
                                    width='50%'
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleSubmit(props.onSubmit)}
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
