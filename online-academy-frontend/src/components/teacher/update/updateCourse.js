import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ImageUploadCard from '../child_component/uploadImage';
import UpdateContent from './updateContent';
import HeaderTeacher from '../child_component/headerTeacher';
import Notification from '../common/Notification';
import Refreshtoken from '../../../refreshToken';

export default function UpdateCourse(props) {
    const classes = useStyles();

    const [isOpened, setOpen] = useState(false);

    const id = props.match.params.id
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))

    const [courseInfo, setCourseInfo] = useState(null); //gọi API để lấy thông tin cũ của khóa học
    const [courseImage, setCourseImage] = useState(null);
    const [thumbnailImage, setThumbnailImage] = useState(null);

    const [courseImageName, setCourseImageName] = useState(null);
    const [thumbnailImageName, setThumbnailImageName] = useState(null);

    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'Tất cả lĩnh vực' }])
    const [listSubCategory, setListSub] = useState([{ id: 1, categoryName: 'Tất cả lĩnh vực phụ' }])

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

    const initData = async () => {
        let info = await axios.get('http://localhost:3001/api/courses/id?id=' + id)
            .then(res => {
                let receiveData = res.data;
                console.log(res.data);
                setCourseInfo(receiveData);
                console.log("abc", courseInfo);
                return courseInfo;

            }).catch(e => {
                console.log(e);
            });
        console.log(info);
        return info;
    }

    const setupSubcate = async () => {
        let subData = await axios.get("http://localhost:3001/api/sub-categories/").then(res => {
            setListSub(res.data)
            return res.data;
        }).catch(error => {
            console.log(error);
            return null;
        })

        return subData;
    }

    const setupCategory = async () => {
        await axios.get("http://localhost:3001/api/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        // const init = async () => {

        //     if (props.courseInfo != null){
        //         await loadImage(props.courseInfo.imageCourse);

        //     }

        // }
        // init();

    }, [props.courseInfo])


    useEffect(() => {
        const init = async () => {
            await setupCategory();
            await setupSubcate();
            let info = await initData();
            // console.log("here", convertImgToBase64("http://localhost:3001/api/files/send?fileName=course1.jpg", (dataUrl) => {
            //     console.log("DataURL", dataUrl);
            //     return dataUrl;
            // }));
            // console.log("info.imageCourse", info);


        }

        init();
    }, [])

    const onSubmit = async data => {
        console.log(data)

        if (courseImage !== null) {
            let formData = new FormData();
            console.log(courseImage.fileName)
            let a = dataURLtoFile(courseImage[0], courseImageName);

            // console.log(selectedFile[0]);
            console.log(courseImageName);
            formData.append("file", a, courseImageName)
            console.log(courseInfo)
            formData.append("courseId", id);


            // console.log(selectedFile)

            await axios.post('http://localhost:3001/api/courses/course-image', formData, {
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
            thumbnailFormData.append("courseId", id);


            await axios.post('http://localhost:3001/api/courses/thumbnail-image', thumbnailFormData, {
                headers: {
                    'x-access-token': await Refreshtoken(),
                    'Content-Type': `multipart/form-data; boundary=${thumbnailFormData._boundary}`
                }
            }).then(res => {
                setOpen(true)
                return true;
            }).catch(e => {
                console.log(e)
                return false;
            })
        }

        await axios.put('http://localhost:3001/api/courses', {
            courseData: data,
            courseId: id
        }, {
            headers: {
                'x-access-token': await Refreshtoken()
            }
        }).then(res => {
            handleOpen()
            
        }).catch(e => {
            console.log(e);
        })
    }

    const handleUI = () => {
        if (courseInfo != null) {
            return (
                <Grid container spacing={3} className={classes.container}>
                    <Grid item xs={12}>
                        <h2>
                            Cập nhật thông tin khóa học
                        </h2>
                    </Grid>
                    {/* ảnh cố định*/}
                    <Grid item xs={2} />
                    <Grid item xs={4}>
                        <Typography variant='h5' align='left'>
                            Ảnh bìa hiện tại
                        </Typography>
                        <img src={'http://localhost:3001/api/files/send?fileName=' + courseInfo.imageCourse}
                            alt="Ảnh bìa" className={classes.photo}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h5' align='left'>
                            Ảnh minh họa hiện tại
                        </Typography>
                        <img src={'http://localhost:3001/api/files/send?fileName=' + courseInfo.imageThumbnail}
                            alt="Ảnh bìa" className={classes.photo}
                        />
                    </Grid>
                    <Grid item xs={2} />

                    {/* Load ảnh */}
                    <Grid item xs={2} />
                    <Grid item xs={4}>
                        <Typography variant='h5' align='left'>
                            Ảnh bìa mới
                        </Typography>
                        <ImageUploadCard id='1' selectedFile={courseImage} setSelectedFile={setCourseImage} setFileName={setCourseImageName} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h5' align='left'>
                            Ảnh minh họa mới
                        </Typography>
                        <ImageUploadCard id='2' selectedFile={thumbnailImage} setSelectedFile={setThumbnailImage} setFileName={setThumbnailImageName} />
                    </Grid>
                    <Grid item xs={2} />


                    {/* Nội dung */}
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <UpdateContent onSubmit={onSubmit} courseInfo={courseInfo}
                            listCategories={listCategories} listSubCategory={listSubCategory}
                            setListCategories={setListCategories} setListSub={setListSub} />
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
            )
        }
        else {
            return;
        }
    }

    return (
        <div fluid>
            <HeaderTeacher />
            <Notification close={()=>{setOpen(false)}} isOpened={isOpened} value={"Cập nhật thành công"}/>
            {
                handleUI()
            }
            {/* <Footer /> */}
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
    underline: {
        borderBottom: '2px solid',

    },
    photo: {
        height: 400,
        width: '100%',
        objectFit: 'scale-down'
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