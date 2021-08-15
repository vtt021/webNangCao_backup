import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { Typography } from '@material-ui/core';
import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Link from '@material-ui/core/Link';
import ImageUploadCard from './child_component/uploadImage';
import UploadContent from './child_component/uploadContent';
import Notification from './common/Notification';
import Refreshtoken from '../../refreshToken';
export default function UploadCourse(props) {
    const classes = useStyles();
    const [isOpened, setOpen] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))

    const id = props.match.params.id

    const [courseImage, setCourseImage] = useState(null);
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [courseImageName, setCourseImageName] = useState(null);
    const [thumbnailImageName, setThumbnailImageName] = useState(null);

    // const [fileName, setFileName] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }


    const onSubmit = async data => {
        console.log(data)

        let ret = await axios.post('http://localhost:3001/api/courses', data, {
            headers: {
                'x-access-token': await Refreshtoken
            }
        }).then(res => {
            handleOpen()
            return res.data.courseId;
        }).catch(e => {
            console.log(e)
            return null;
        })

        console.log(ret)
        // console.log(courseImage[0]);

        if (ret !== null) {
            if (courseImage !== null) {
                let formData = new FormData();
                console.log(courseImage.fileName)
                let a = dataURLtoFile(courseImage[0], courseImageName);

                // console.log(selectedFile[0]);
                console.log(courseImageName);
                formData.append("file", a, courseImageName)
                formData.append("courseId", ret);


                // console.log(selectedFile)

                let result1 = await axios.post('http://localhost:3001/api/courses/course-image', formData, {
                    headers: {
                        'x-access-token': await Refreshtoken(),
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
                    }
                }).then(res => {
                    console.log("Upload success!")
                    return true;
                }).catch(e => {
                    console.log(e)
                    return false;
                })
            }

            if (thumbnailImage != null) {
                let thumbnailFormData = new FormData();
                console.log(thumbnailImage.fileName)
                let a = dataURLtoFile(thumbnailImage[0], thumbnailImageName);

                // console.log(selectedFile[0]);
                console.log(thumbnailImageName);
                thumbnailFormData.append("file", a, thumbnailImageName)
                thumbnailFormData.append("courseId", ret);


                // console.log(selectedFile)

                let result2 = axios.post('http://localhost:3001/api/courses/thumbnail-image', thumbnailFormData, {
                    headers: {
                        'x-access-token': await Refreshtoken(),
                        'Content-Type': `multipart/form-data; boundary=${thumbnailFormData._boundary}`
                    }
                }).then(res => {
                    console.log("Upload success!")
                    return true;
                }).catch(e => {
                    console.log(e)
                    return false;
                })
            }
        }
    }

    return (
        <div fluid>

            <Header />
            <Notification close={()=>{setOpen(false)}} isOpened={isOpened} value={"Đăng khóa học thành công"}/>
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12}>
                    <h2>
                        Đăng khóa học mới
                    </h2>
                </Grid>

                <Grid item xs={2}>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h5' align='left'>
                        Ảnh bìa:
                    </Typography>
                    <ImageUploadCard id='1' selectedFile={courseImage} setSelectedFile={setCourseImage} setFileName={setCourseImageName} />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h5' align='left'>
                        Ảnh minh họa:
                    </Typography>
                    <ImageUploadCard id='2' selectedFile={thumbnailImage} setSelectedFile={setThumbnailImage} setFileName={setThumbnailImageName} />
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <UploadContent onSubmit={onSubmit} />
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
            <Container component="main" maxWidth="xs">
            </Container>
            <Footer />
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        marginTop: 50,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        justify: 'flex-start',

    },
    leftPaper: {
        padding: theme.spacing(2),
        background: '#E6DDC6',
        width: '100%',
        marginBottom: '5%',
    },
    rightPaper: {
        padding: theme.spacing(2),
        background: '#FEF7DC',
        width: '100%',
        marginBottom: '5%',
    },
    underline: {
        borderBottom: '2px solid',

    },
    grid1: {
    },
    grid2: {

    },
    grid3: {
        marginTop: '20%'
    },
    list: {
        width: '100%'
    },
    listItem: {
        background: '#E6DDC6'
    }

}));
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